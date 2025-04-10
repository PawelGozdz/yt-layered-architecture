# NoteKeeper - Layered Architecture Showcase

This project demonstrates different approaches to layered architecture in TypeScript. It serves as an educational resource for understanding and comparing various architectural patterns including Traditional Layered, Clean Architecture, Onion Architecture, and Hexagonal Architecture.

## Project Overview

NoteKeeper is a simple note management system that allows creating, reading, updating, and deleting notes. It supports categorization, tagging, and search functionality.

## Architecture Approaches

This project implements the same application using four different architectural approaches:

### 1. Traditional Layered Architecture

```
traditional-layered/
├── presentation/    # UI, controllers, views, DTOs
├── business/        # Business logic, services
├── data-access/     # Data access layer, repositories
└── domain/          # Domain models
```

- **Key characteristics**: Top-down dependency flow, separation by technical concerns

### 2. Clean Architecture (Uncle Bob)

```
clean-architecture/
├── entities/        # Enterprise business rules
├── use-cases/       # Application business rules
├── adapters/        # Interface adapters (controllers, presenters, gateways)
└── frameworks/      # Frameworks and drivers (web, DB, devices)
```

- **Key characteristics**: Dependency rule (dependencies point inward), enterprise business rules at the center

### 3. Onion Architecture

```
onion-architecture/
├── domain/              # Domain model (entities, value objects)
│   ├── models/          # Core domain entities
│   └── services/        # Domain services
├── domain-services/     # Services that operate on domain models
├── application-services/# Orchestration of domain services
└── infrastructure/      # External dependencies implementation
    ├── persistence/     # Data access implementation
    └── ui/              # User interface implementation
```

- **Key characteristics**: Domain at the center, layers depend inward

### 4. Hexagonal Architecture (Ports & Adapters)

```
hexagonal-architecture/
├── domain/          # Core business logic
│   ├── model/       # Domain models
│   └── ports/       # Interfaces defining ports
│       ├── incoming/# Primary/driving ports (use cases)
│       └── outgoing/# Secondary/driven ports (repositories, notifications)
└── adapters/        # Implementations of ports
    ├── primary/     # Driving adapters (REST, GraphQL, CLI)
    └── secondary/   # Driven adapters (DB, external services)
```

- **Key characteristics**: Domain at the center, ports define interfaces, adapters implement them

## Project Structure

```
notekeeper/
│
├── src/
│   ├── common/                  # Shared utilities and interfaces
│   │   └── interfaces/          # Shared interfaces
│   │
│   ├── database/                # Centralized database infrastructure
│   │   ├── postgres/            # PostgreSQL specific code
│   │   │   └──migrations/      # PostgreSQL migrations
│   │   │
│   │   ├── mongodb/             # MongoDB specific code
│   │   │   └── migrations/      # Mongodb migrations
│   │
│   ├── traditional-layered/     # Traditional N-tier architecture
│   │   ├── presentation/        # UI, controllers, views, DTOs
│   │   ├── business/            # Business logic, services
│   │   ├── data-access/         # Data access layer, repositories
│   │   └── domain/              # Domain models
│   │
│   ├── clean-architecture/      # Clean Architecture (Uncle Bob)
│   │   ├── entities/            # Enterprise business rules
│   │   ├── use-cases/           # Application business rules
│   │   ├── adapters/            # Interface adapters (controllers, presenters, gateways)
│   │   └── frameworks/          # Frameworks and drivers (web, DB, devices)
│   │
│   ├── onion-architecture/      # Onion Architecture (Jeffrey Palermo)
│   │   ├── domain/              # Domain model (entities, value objects)
│   │   │   ├── models/          # Core domain entities
│   │   │   └── services/        # Domain services
│   │   ├── domain-services/     # Services that operate on domain models
│   │   ├── application-services/# Orchestration of domain services
│   │   └── infrastructure/      # External dependencies implementation
│   │       ├── persistence/     # Data access implementation
│   │       └── ui/              # User interface implementation
│   │
│   └── hexagonal-architecture/  # Hexagonal/Ports & Adapters (Alistair Cockburn)
│       ├── domain/              # Core business logic
│       │   ├── model/           # Domain models
│       │   └── ports/           # Interfaces defining ports
│       │       ├── incoming/    # Primary/driving ports (use cases)
│       │       └── outgoing/    # Secondary/driven ports (repositories, notifications)
│       └── adapters/            # Implementations of ports
│           ├── primary/         # Driving adapters (REST, GraphQL, CLI)
│           └── secondary/       # Driven adapters (DB, external services)
│
├── config/                      # Centralized configuration
│   ├── database.ts              # Database configuration
│   └── app.ts                   # Application configuration
│
└── docs/                        # Documentation and diagrams
```

## Getting Started

### Prerequisites

- Node.js (v22.5+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/PawelGozdz/yt-layered-architecture.git ./notekeeper
cd notekeeper

# Install dependencies
npm install
```

### Running the Application

```bash
# Start the application
npm start

# Start in development mode with hot reload
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with watch mode
npm run test:watch
```

### Code Quality

```bash
# Check code formatting
npm run format:check

# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Fix formatting and linting in one command
npm run fix
```

## Architecture Diagrams

### Traditional Layered Architecture
```
┌────────────────────┐
│  Presentation      │
│  (Controllers)     │
└─────────┬──────────┘
          │ depends on
          ▼
┌────────────────────┐
│  Business          │
│  (Services)        │
└─────────┬──────────┘
          │ depends on
          ▼
┌────────────────────┐
│  Data Access       │
│  (Repositories)    │
└─────────┬──────────┘
          │ depends on
          ▼
┌────────────────────┐
│  Domain            │
│  (Models)          │
└────────────────────┘
```

### Clean Architecture
```
┌───────────────────────────────────────────┐
│ Frameworks & Drivers                       │
│ ┌───────────────────────────────────────┐ │
│ │ Interface Adapters                     │ │
│ │ ┌───────────────────────────────────┐ │ │
│ │ │ Application Business Rules         │ │ │
│ │ │ ┌───────────────────────────────┐ │ │ │
│ │ │ │                               │ │ │ │
│ │ │ │     Enterprise Business Rules │ │ │ │
│ │ │ │     (Entities)                │ │ │ │
│ │ │ │                               │ │ │ │
│ │ │ └───────────────────────────────┘ │ │ │
│ │ │           Use Cases                │ │ │
│ │ └───────────────────────────────────┘ │ │
│ │           Controllers, Gateways        │ │
│ └───────────────────────────────────────┘ │
│           Frameworks, Drivers              │
└───────────────────────────────────────────┘
```

### Onion Architecture
```
┌───────────────────────────────────────────┐
│ Infrastructure                             │
│ ┌───────────────────────────────────────┐ │
│ │ Application Services                   │ │
│ │ ┌───────────────────────────────────┐ │ │
│ │ │ Domain Services                    │ │ │
│ │ │ ┌───────────────────────────────┐ │ │ │
│ │ │ │                               │ │ │ │
│ │ │ │           Domain              │ │ │ │
│ │ │ │                               │ │ │ │
│ │ │ └───────────────────────────────┘ │ │ │
│ │ └───────────────────────────────────┘ │ │
│ └───────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

### Hexagonal Architecture
```
┌────────────────────────────────────────────────┐
│                                                │
│  ┌────────────┐         ┌────────────┐         │
│  │            │         │            │         │
│  │  Primary   │         │ Secondary  │         │
│  │  Adapters  │         │ Adapters   │         │
│  │            │         │            │         │
│  └──────┬─────┘         └─────┬──────┘         │
│         │                     │                │
│  ┌──────▼─────┐         ┌─────▼──────┐         │
│  │            │         │            │         │
│  │  Primary   │         │ Secondary  │         │
│  │  Ports     │◄────────►  Ports     │         │
│  │            │         │            │         │
│  └──────┬─────┘         └─────┬──────┘         │
│         │                     │                │
│         │    ┌──────────┐     │                │
│         │    │          │     │                │
│         └────►  Domain  ◄─────┘                │
│              │          │                      │
│              └──────────┘                      │
│                                                │
└────────────────────────────────────────────────┘
```

## Contribute

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.