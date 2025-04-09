/**
 * Generic Repository interface
 * This serves as a base contract for all repositories across different architectures
 */
export interface IRepository<T, ID> {
  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Find entity by ID
   * @param id Entity ID
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Create a new entity
   * @param data Entity data
   */
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * Update an existing entity
   * @param id Entity ID
   * @param data Updated entity data
   */
  update(id: ID, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T | null>;

  /**
   * Delete an entity
   * @param id Entity ID
   */
  delete(id: ID): Promise<boolean>;
}
