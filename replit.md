# Overview

ShiftGenius AI is an intelligent shift scheduling system designed for manufacturing and production environments. The application combines a React/TypeScript frontend with a Node.js/Express backend, featuring AI-powered scheduling optimization to manage workforce assignments across production areas. The system provides real-time dashboards, employee management, production area monitoring, and automated shift planning capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation through Hookform resolvers

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple

## Database Design
- **ORM**: Drizzle ORM with schema-first approach located in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for schema migrations stored in `/migrations` directory
- **Schema**: Includes employees, production areas, process steps, production orders, and shift assignments tables
- **Types**: Shared TypeScript types generated from Drizzle schema using drizzle-zod

## Development Architecture
- **Build System**: Vite for frontend bundling with esbuild for backend compilation
- **Development Server**: Hot module replacement for frontend, tsx for backend development
- **Code Organization**: Monorepo structure with shared types and utilities
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`, `@assets/`)

## Key Design Decisions
- **Full-stack TypeScript**: Ensures type safety across frontend, backend, and database layers
- **Shared Schema**: Single source of truth for data models accessible to both frontend and backend
- **Component-based UI**: Reusable components following Shadcn/ui patterns for consistency
- **Real-time Updates**: Query invalidation and refetching for live data updates
- **Drag-and-drop Interface**: Interactive shift assignment management for production planning

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Environment Configuration**: DATABASE_URL environment variable for database connectivity

## UI Framework Dependencies
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with validation support

## Development Tools
- **Replit Integration**: Runtime error overlay and cartographer plugins for development
- **TypeScript**: Strict type checking with path mapping and ES module support
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## Build and Deployment
- **Vite Plugins**: React support, runtime error handling, and Replit-specific tooling
- **ESBuild**: Fast compilation for production builds
- **Static Asset Handling**: Configured asset resolution and public directory management