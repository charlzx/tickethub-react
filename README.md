# TicketHub - React + Next.js Ticket Management System

A modern, full-featured ticket management web application built with **Next.js** and **React**. Manage customer support tickets with an intuitive interface, authentication, and complete CRUD operations.

## 🚀 Features

- **Landing Page** - Hero section with wavy SVG background and decorative elements
- **Authentication** - Secure login/signup with form validation and session management
- **Dashboard** - Real-time statistics (Total, Open, Resolved tickets)
- **Ticket Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Responsive Design** - Mobile-first with tablet and desktop layouts
- **Toast Notifications** - User feedback for all actions
- **Protected Routes** - Middleware-based authentication

## 🛠️ Technologies & Libraries

### Core Framework
- **Next.js** - React meta-framework with SSR and modern routing
- **React** - Progressive JavaScript UI library
- **TypeScript** - Type-safe development

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI (React)** - Headless UI primitives (Dialog, Select, etc.)
- **Lucide React** - Icon library

### State & Data Management
- **React Context & custom hooks** - Lightweight app state and auth handling
- **Zod** - Schema validation
- **localStorage** - Simple mock database for tickets and users

### Fonts
- **Inter** - Body text (400-700 weights)
- **Space Grotesk** - Headlines (500, 700 weights)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Clone the Repository
```bash
git clone https://github.com/charlzx/tickethub-react.git
cd tickethub-react
```

### Install Dependencies
```bash
npm install
# or
pnpm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000` 

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run start
```