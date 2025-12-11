# Farmers Drone

A modern, role-based dashboard application built with React, Vite, and static authentication.

🌐 **Live Demo**: [https://farmers-drone.vercel.app/](https://farmers-drone.vercel.app/)

## Features

- 🔐 **Role-Based Access Control**: Different dashboard views for Admin, Marketing, Employee, and Field Agent roles
- 🚀 **Modern Tech Stack**: React 19, Vite, TailwindCSS
- 📱 **Responsive Design**: Mobile-first responsive design with TailwindCSS
- 🛡️ **Protected Routes**: Authentication-based route protection
- ⚡ **Fast Development**: Hot module replacement with Vite
- 🎨 **Clean UI**: Professional UI components with consistent design system
- 🧩 **Modular Architecture**: Well-organized component structure
- 🌐 **Multi-language Support**: English and Hindi translations

## Tech Stack

- **Frontend**: React 19, React Router DOM 7
- **Styling**: TailwindCSS 4
- **Authentication**: Static Authentication (ready for API integration)
- **Build Tool**: Vite 7
- **Linting**: ESLint 9
- **Icons**: React Icons, Lucide React
- **Internationalization**: i18next

## Getting Started

### Prerequisites

- Node.js 20.19.0+ and npm 10.0.0+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mehediScriptDev/Farmers_Drone.git
cd Farmers_Drone
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run clean` - Clean build directory

## User Roles & Demo Accounts

The application supports four user roles with static authentication:

- **Admin** (`admin@example.com`) - Full system access
- **Marketing** (`marketing@example.com`) - Marketing dashboard
- **Employee** (`employee@example.com`) - Employee dashboard
- **Field Agent** (`fieldagent@example.com`) - Field agent dashboard

_Password for all accounts: `12345`_

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Input, Layout, etc.)
│   ├── admin/           # Admin dashboard and components
│   ├── employee/        # Employee-specific components
│   ├── fieldAgent/      # Field agent components
│   ├── marketing/       # Marketing dashboard components
│   └── utility/         # Utility components (ErrorBoundary)
├── config/              # Configuration files
├── constants/           # Application constants
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── locales/             # Internationalization files
├── pages/               # Page components
├── router/              # Router configuration
├── services/            # API and external service integrations
└── utils/               # Utility functions
```

## Authentication Flow

1. Users access protected routes
2. `useRequireAuth` hook checks authentication status
3. Unauthenticated users are redirected to login
4. Authenticated users see role-appropriate dashboard
5. Unauthorized role access redirects to unauthorized page

## Building for Production

1. Set production environment variables
2. Run the build command:

```bash
npm run build
```

3. The `dist` folder contains the production-ready files
4. Deploy to your preferred hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
