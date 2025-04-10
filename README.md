# NoteKeeper - Layered Architecture Showcase

This project demonstrates different approaches to layered architecture in TypeScript. It serves as an educational resource for understanding and comparing various architectural patterns including Traditional Layered, Clean Architecture, Onion Architecture, and Hexagonal Architecture.

## Project Overview

NoteKeeper is a simple note management system that allows creating, reading, updating, and deleting notes. It supports categorization, tagging, and search functionality.

## Architecture Approaches

This project implements the same application using four different architectural approaches:

### 1. Traditional Layered Architecture

```
traditional-layered/
├── presentation/    # UI, Controllers, DTOs
├── business/        # Business logic, Services
└── data-access/     # Data access, Repositories
```

- **Key characteristics**: Top-down dependency flow, separation by technical concerns

### 2. Clean Architecture (Uncle Bob)

```
clean-architecture/
├── entities/              # Enterprise business rules
├── use-cases/             # Application-specific business rules
├── interfaces/            # Adapters and ports interfaces
└── frameworks/            # Frameworks, drivers, external systems
```

- **Key characteristics**: Dependency rule (dependencies point inward), enterprise business rules at the center

### 3. Onion Architecture

```
onion-architecture/
├── domain/                # Domain models and logic
├── domain-services/       # Domain-specific services
├── application-services/  # Application services, orchestration
└── infrastructure/        # Technical implementations
```

- **Key characteristics**: Domain at the center, layers depend inward

### 4. Hexagonal Architecture (Ports & Adapters)

```
hexagonal-architecture/
├── domain/         # Core domain logic
├── ports/          # Interfaces the application exposes and requires
│   ├── primary/    # Inbound ports (use cases)
│   └── secondary/  # Outbound ports (services application needs)
└── adapters/       # Implementations of ports
    ├── primary/    # Inbound adapters (controllers, handlers)
    └── secondary/  # Outbound adapters (repositories, services)
```

- **Key characteristics**: Domain at the center, ports define interfaces, adapters implement them

## Project Structure

```
notekeeper/
│
├── src/
│   ├── common/                  # Shared components, models, interfaces
│   │   ├── models/              # Base data models
│   │   └── interfaces/          # Shared interfaces
│   │
│   ├── traditional-layered/     # Traditional layered implementation
│   │
│   ├── clean-architecture/      # Clean Architecture implementation
│   │
│   ├── onion-architecture/      # Onion Architecture implementation
│   │
│   └── hexagonal-architecture/  # Hexagonal Architecture implementation
│
├── tests/                       # Tests for all implementations
│   ├── unit/                    # Unit tests
│   └── integration/             # Integration tests
│
└── docs/                        # Documentation and diagrams
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

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