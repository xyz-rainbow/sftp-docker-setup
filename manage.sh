#!/bin/bash

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ENV_FILE=".env"
EXAMPLE_FILE=".env.example"

# Función para cargar variables
load_env() {
    if [ -f "$ENV_FILE" ]; then
        export $(grep -v '^#' "$ENV_FILE" | xargs)
    fi
}

# Función para crear .env si no existe
check_env() {
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${BLUE}Creando archivo .env desde ejemplo...${NC}"
        cp "$EXAMPLE_FILE" "$ENV_FILE"
    fi
    load_env
}

# Función para actualizar una variable en .env
update_env() {
    local key=$1
    local value=$2
    # Escapar caracteres especiales para sed
    local escaped_value=$(printf '%s\n' "$value" | sed -e 's/[\/&]/\\&/g')
    
    if grep -q "^$key=" "$ENV_FILE"; then
        sed -i "s/^$key=.*/$key=$escaped_value/" "$ENV_FILE"
    else
        echo "$key=$value" >> "$ENV_FILE"
    fi
}

# Menú de Configuración
configure() {
    echo -e "${BLUE}--- Configuración ---${NC}"
    
    read -p "Puerto SFTP [${SFTP_PORT:-2222}]: " port
    port=${port:-${SFTP_PORT:-2222}}
    update_env "SFTP_PORT" "$port"
    
    read -p "Usuario SFTP [${SFTP_USER:-sftpuser}]: " user
    user=${user:-${SFTP_USER:-sftpuser}}
    update_env "SFTP_USER" "$user"
    
    read -p "Contraseña SFTP [${SFTP_PASSWORD:-password123}]: " pass
    pass=${pass:-${SFTP_PASSWORD:-password123}}
    update_env "SFTP_PASSWORD" "$pass"

    echo -e "${BLUE}Ruta de la carpeta local a compartir:${NC}"
    echo "  Ejemplo Linux: /home/usuario/Documents/SFTP"
    echo "  Ejemplo Windows: /c/Users/Usuario/Documents/SFTP"
    read -p "Ruta [${HOST_UPLOAD_DIR:-./data}]: " dir
    dir=${dir:-${HOST_UPLOAD_DIR:-./data}}
    update_env "HOST_UPLOAD_DIR" "$dir"

    read -p "Token Cloudflare Tunnel (Opcional, Enter para saltar): " token
    if [ ! -z "$token" ]; then
        update_env "CLOUDFLARE_TOKEN" "$token"
    fi
    
    echo -e "${GREEN}Configuración guardada en .env${NC}"
    load_env
}

# Iniciar servicios
start() {
    echo -e "${BLUE}Iniciando servicios...${NC}"
    if [ ! -z "$CLOUDFLARE_TOKEN" ]; then
        docker-compose --profile tunnel up -d --build
    else
        docker-compose up -d --build
    fi
    echo -e "${GREEN}Servicios iniciados.${NC}"
    show_info
}

# Detener servicios
stop() {
    echo -e "${BLUE}Deteniendo servicios...${NC}"
    docker-compose --profile tunnel down
    echo -e "${GREEN}Servicios detenidos.${NC}"
}

# Mostrar información de conexión
show_info() {
    load_env
    echo -e "\n${BLUE}--- Información de Conexión ---${NC}"
    echo -e "Usuario: ${GREEN}$SFTP_USER${NC}"
    echo -e "Contraseña: ${GREEN}$SFTP_PASSWORD${NC}"
    echo -e "Puerto Local: ${GREEN}$SFTP_PORT${NC}"
    
    # Obtener IP local (intento básico)
    local_ip=$(hostname -I | awk '{print $1}')
    echo -e "IP Local: ${GREEN}$local_ip${NC}"
    
    echo -e "\n${BLUE}Comando para conectar por SSH:${NC}"
    echo -e "ssh -p $SFTP_PORT $SFTP_USER@localhost"
    echo -e "ssh -p $SFTP_PORT $SFTP_USER@$local_ip"

    if [ ! -z "$CLOUDFLARE_TOKEN" ]; then
        echo -e "\n${BLUE}Cloudflare Tunnel:${NC}"
        echo "Revisa el dashboard de Cloudflare Zero Trust para ver tu dominio público."
    fi
}

# Abrir sesión SSH
open_ssh() {
    echo -e "${BLUE}Conectando al contenedor...${NC}"
    docker exec -it sftp_server bash
}

# --- Funciones de UI ---

# Función para leer una tecla (compatible con flechas)
read_key() {
    local key
    read -rsn1 key 2>/dev/null >&2
    if [[ "$key" == $'\x1b' ]]; then
        read -rsn2 key
        if [[ "$key" == "[A" ]]; then echo "UP"; fi
        if [[ "$key" == "[B" ]]; then echo "DOWN"; fi
    elif [[ "$key" == "" ]]; then
        echo "ENTER"
    else
        echo "$key"
    fi
}

# Menú Interactivo con Flechas
show_menu() {
    local options=("Iniciar / Reiniciar" "Detener" "Configurar" "Ver Información" "Abrir Terminal SSH" "Salir")
    local descriptions=(
        "Levanta los contenedores y aplica cambios"
        "Detiene y elimina los contenedores"
        "Define puerto, usuario y carpetas"
        "Muestra IP, puerto y comandos de conexión"
        "Accede a la terminal dentro del contenedor"
        "Cierra este script"
    )
    local selected=0
    local total=${#options[@]}

    while true; do
        clear
        echo -e "${BLUE}=== Gestor SFTP Docker ===${NC}"
        echo -e "Usa las flechas ${GREEN}↑/↓${NC} para moverte y ${GREEN}ENTER${NC} para seleccionar.\n"

        for ((i=0; i<total; i++)); do
            if [ $i -eq $selected ]; then
                echo -e "${GREEN}> ${options[$i]}${NC}  ${BLUE}(${descriptions[$i]})${NC}"
            else
                echo -e "  ${options[$i]}  ${NC}(${descriptions[$i]})${NC}"
            fi
        done

        local action=$(read_key)
        
        case "$action" in
            UP)
                ((selected--))
                if [ $selected -lt 0 ]; then selected=$((total-1)); fi
                ;;
            DOWN)
                ((selected++))
                if [ $selected -ge $total ]; then selected=0; fi
                ;;
            ENTER)
                case $selected in
                    0) start; read -p "Presiona Enter para continuar..." ;;
                    1) stop; read -p "Presiona Enter para continuar..." ;;
                    2) configure; read -p "Presiona Enter para continuar..." ;;
                    3) show_info; read -p "Presiona Enter para continuar..." ;;
                    4) open_ssh; read -p "Presiona Enter para continuar..." ;;
                    5) exit 0 ;;
                esac
                ;;
        esac
    done
}

# Ejecutar menú o comando
check_env

# Si hay argumentos, ejecutar comando directo
if [ $# -gt 0 ]; then
    case "$1" in
        start) start ;;
        stop) stop ;;
        config) configure ;;
        info) show_info ;;
        ssh) open_ssh ;;
        *) 
            echo -e "${RED}Comando desconocido: $1${NC}"
            echo "Uso: $0 [start|stop|config|info|ssh]"
            exit 1
            ;;
    esac
else
    # Si no hay argumentos, mostrar menú interactivo
    show_menu
fi
