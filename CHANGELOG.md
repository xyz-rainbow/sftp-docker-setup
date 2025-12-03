# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [2.0.0] - 2025-12-03

### 🎉 Añadido
- **Landing Page Premium**: Página de inicio completamente rediseñada con:
  - Hero section con gradientes animados
  - 3 tarjetas de características con efectos hover
  - Sección de estadísticas del proyecto
  - CTA button con animación de gradiente
  - Diseño responsive para todos los dispositivos

- **Dashboard Funcional**: Panel de control completo con:
  - 4 tarjetas de métricas del sistema (CPU, Memoria, Disco, Red)
  - Tabla de contenedores Docker con datos mock
  - Indicadores de estado visual (running/stopped)
  - Botones de acción para cada contenedor (play, stop, delete)
  - Header con navegación y configuración

- **Sistema de Diseño Moderno**:
  - Paleta de colores premium (púrpura-rosa-azul)
  - Efectos glassmorphism en componentes
  - Gradientes vibrantes en fondos y botones
  - Animaciones suaves y micro-interacciones
  - Variables CSS personalizadas para temas
  - Scrollbar personalizado

- **Internacionalización Mejorada**:
  - Migración a Next.js 16 routing system
  - Estructura de carpetas [locale]
  - Archivos de traducción actualizados (EN, ES, ZH, HI, FR)
  - Configuración de routing i18n
  - Middleware convertido a proxy.ts

- **Documentación**:
  - README completo con características y guía de instalación
  - Estructura del proyecto documentada
  - Roadmap de futuras versiones
  - Agent notes actualizadas
  - Este CHANGELOG

### 🔧 Cambiado
- **Next.js**: Actualizado a versión 16.0.6 con Turbopack
- **React**: Actualizado a versión 19.2.0
- **Tailwind CSS**: Migrado a versión 4
- **Estructura de archivos**: Reorganizada para mejor modularidad
- **CSS Global**: Reescrito con variables CSS y utilidades modernas
- **Metadata**: Actualizada con información del proyecto

### 🐛 Corregido
- Problemas de compatibilidad con Tailwind CSS v4
- Errores de routing con Next.js 16
- Configuración de i18n para nuevo sistema de proxy
- Warnings de middleware deprecado

### 📝 Notas Técnicas
- Migración de `middleware.ts` a `proxy.ts` (Next.js 16)
- Implementación de `[locale]` routing pattern
- Uso de React Compiler (babel-plugin-react-compiler)
- Turbopack como bundler por defecto en desarrollo

---

## [1.0.0] - 2025-12-02

### Añadido
- Proyecto inicial con Next.js
- Configuración básica de i18n
- Estructura de carpetas inicial
- Archivos de traducción básicos (5 idiomas)
- Configuración de Tailwind CSS
- ESLint y TypeScript

### Notas
- Versión inicial del proyecto
- Rama `v1-sftp-standalone` para servidor SFTP
- Rama `v2-dashboard` para panel web

---

## Leyenda de Tipos de Cambios

- **Añadido**: Para nuevas características
- **Cambiado**: Para cambios en funcionalidad existente
- **Deprecado**: Para características que serán removidas
- **Removido**: Para características removidas
- **Corregido**: Para corrección de bugs
- **Seguridad**: Para vulnerabilidades de seguridad

---

[2.0.0]: https://github.com/xyz-rainbow/docker-dashboard/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/xyz-rainbow/docker-dashboard/releases/tag/v1.0.0
