# Nexus Panel - Docker Dashboard

Nexus Panel is a modern, real-time Docker management dashboard built with Next.js 16, React 19, and Tailwind CSS. It features a beautiful glassmorphism UI, multi-language support, and interactive container management.

![Nexus Panel](https://raw.githubusercontent.com/xyz-rainbow/docker-dashboard/main/public/screenshot.png)

## Features

- 🚀 **Real-time Monitoring**: Live CPU, Memory, Disk, and Network metrics.
- 📦 **Container Management**: Start, stop, restart, and delete containers with ease.
- 🌐 **Multi-language Support**: Available in English, Spanish, Chinese, Hindi, and French.
- 🎨 **Modern UI**: Sleek dark mode design with glassmorphism and smooth animations.
- 🔒 **Secure Actions**: Mathematical challenge verification for critical actions like deletion.
- 📝 **Live Logs**: View real-time logs for any container.
- ⚙️ **Configurable**: Easy-to-use settings for server and dashboard configuration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Internationalization**: next-intl
- **Icons**: React Icons (SVG)

## Installation

### Prerequisites

- Node.js 18+
- Docker Engine installed and running

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/xyz-rainbow/docker-dashboard.git
   cd docker-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the dashboard**
   Visit `http://localhost:3000` in your browser.

## Configuration

You can configure the dashboard settings by clicking the gear icon in the top right corner. Available settings include:
- Server Port
- Dashboard URL
- Refresh Rate
- Docker Socket Path

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
