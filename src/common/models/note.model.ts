/**
 * Basic Note model that will be shared across different architectural approaches
 */
export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string;
  tags?: string[];
  userId?: string;
}

/**
 * Data Transfer Object for creating a new Note
 */
export interface ICreateNoteDto {
  title: string;
  content: string;
  categoryId?: string;
  tags?: string[];
  userId?: string;
}

/**
 * Data Transfer Object for updating an existing Note
 */
export interface IUpdateNoteDto {
  title?: string;
  content?: string;
  categoryId?: string;
  tags?: string[];
}
