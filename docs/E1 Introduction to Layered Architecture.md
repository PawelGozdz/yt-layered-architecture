---
created-date: 2025-04-10 08:58
tags:
  - "#tech/nodejs"
  - project/youtube
  - architect/layered-architecture
  - episode/1
aliases: 
summary: 
status: Completed
---

# Introduction to Layered Architecture

## Overview

This document provides a comprehensive introduction to layered architecture approaches in software development, serving as supplementary material for Episode 1 of the Layered Architecture series.

## The Problem: Lack of Structure in Code

Unstructured code, often referred to as "spaghetti code," is characterized by:

![](../static/Pasted%20image2020250410121730.png)

- Business logic mixed with database access code
- Scattered data validation
- Presentation logic intertwined with business logic
- Configuration embedded directly in application code

These issues lead to several significant challenges:

![](/static/Pasted image 20250410121857.png)

1. **Risky Changes**: Modifications affect multiple aspects of the application simultaneously
2. **Testing Difficulties**: Unit testing becomes nearly impossible
3. **Collaboration Hurdles**: Team members experience frequent conflicts
4. **Limited Extensibility**: Adding new features becomes increasingly difficult

## Layered Architecture Concept

Layered architecture organizes code into clearly separated layers, each with specific responsibilities:

```
┌───────────────────────┐
│  Presentation Layer   │ ← User interfaces, API controllers
├───────────────────────┤
│  Application Layer    │ ← Use cases, application services
├───────────────────────┤
│  Domain Layer         │ ← Business logic, domain models
├───────────────────────┤
│  Infrastructure Layer │ ← External resources, databases
└───────────────────────┘
```

### Typical Layers

![](/static/Pasted image 20250410121942.png)

1. **Presentation Layer**: Handles user interaction (UI, API endpoints)
2. **Application Layer**: Orchestrates data flow and implements use cases
3. **Domain Layer**: Contains business logic and domain models
4. **Infrastructure Layer**: Manages communication with external resources

### The Dependency Rule

A fundamental principle of layered architecture is the direction of dependencies - higher layers depend on lower layers, never the opposite. This ensures that changes in external layers (e.g., infrastructure) don't affect internal layers (e.g., domain).

![](/static/Pasted image 20250418183939.png)

This principle forms the foundation for all variants of layered architecture discussed in this series.

## Benefits of Layered Architecture

Implementing layered architecture offers numerous advantages:

1. **Separation of Concerns (SoC)**
    
    - Each layer has clearly defined responsibilities
    - Easier code comprehension and maintenance
2. **Testability**
    
    - Layers can be tested independently
    - Facilitates unit testing through isolation

```typescript
// customers.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let mockRepository: { findOne: jest.Mock };

  beforeEach(async () => {
    // Create mock repository
    mockRepository = { findOne: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should mark customer as premium when order count > 10', async () => {
    // Arrange
    const testCustomer = new Customer();
    testCustomer.id = 1;
    testCustomer.name = 'Test Customer';
    testCustomer.orderCount = 15;
    testCustomer.premiumStatus = false;
    
    mockRepository.findOne.mockResolvedValue(testCustomer);
    
    // Act
    const result = await service.findPremiumCustomer(1);
    
    // Assert
    expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    expect(result.premiumStatus).toBe(true);
  });

  it('should return null when customer not found', async () => {
    // Arrange
    mockRepository.findOne.mockResolvedValue(null);
    
    // Act
    const result = await service.findPremiumCustomer(999);
    
    // Assert
    expect(result).toBeNull();
  });
});
```

3. **Implementation Swapping**
    
    - Replace layer implementations (e.g., database) without affecting other system parts
    - Promotes flexibility and adaptability
4. **Parallel Development**
    
    - Different team members can work on different layers simultaneously
    - Improves team efficiency
5. **Reusability**
    
    - Domain and application layers can be reused in different contexts
    - Promotes code sharing and consistency

## Trade-offs

![](/static/Pasted image 20250410123651.png)

As with any architectural approach, layered architecture involves certain trade-offs:

1. **Increased Complexity**
    
    - Additional abstraction layers
    - More initial setup required
2. **Performance Overhead**
    
    - Data mapping between layers
    - Multiple abstraction layers
3. **Learning Curve**
    
    - Team members need to understand the architecture
    - Discipline required to maintain layer separation

For small projects or prototypes, the benefits may not justify the added complexity.

## Common Layered Architecture Patterns

Throughout this series, we'll explore several popular layered architecture patterns:

1. **Traditional N-tier Architecture**
2. **Clean Architecture** (by Robert C. Martin)
3. **Onion Architecture** (by Jeffrey Palermo)
4. **Hexagonal Architecture** (Ports & Adapters, by Alistair Cockburn)

Each pattern offers unique perspectives on how to organize code while adhering to the fundamental principles of layered architecture.

## Summary

Layered architecture:

- Organizes code through clear separation of responsibilities
- Facilitates testing and application extension
- Improves team collaboration
- Serves as the foundation for various architectural variants

## Resources

- Martin, R. C. (2012). The Clean Architecture. https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- Palermo, J. (2008). The Onion Architecture. https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/
- Cockburn, A. (2005). Hexagonal Architecture. https://alistair.cockburn.us/hexagonal-architecture/
- Vernon, V. (2013). Implementing Domain-Driven Design. Addison-Wesley Professional.
- Evans, E. (2003). Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley Professional.


## Backlinks
```dataview
TABLE WITHOUT ID 
file.inlinks as Links,
file.mtime as Modified
WHERE file.name = this.file.name
```