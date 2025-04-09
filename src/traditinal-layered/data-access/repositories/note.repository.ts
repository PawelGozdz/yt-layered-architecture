import { v4 as uuidv4 } from 'uuid';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { INote, ICreateNoteDto, IUpdateNoteDto } from '../../../common/models/note.model';

/**
 * In-memory repository implementation for Notes in Traditional Layered Architecture
 */
export class NoteRepository implements IRepository<INote, string> {
  private notes: Map<string, INote> = new Map<string, INote>();

  /**
   * Find all notes
   */
  async findAll(): Promise<INote[]> {
    return Array.from(this.notes.values());
  }

  /**
   * Find note by ID
   * @param id Note ID
   */
  async findById(id: string): Promise<INote | null> {
    const note = this.notes.get(id);
    return note || null;
  }

  /**
   * Create a new note
   * @param data Note data
   */
  async create(data: ICreateNoteDto): Promise<INote> {
    const now = new Date();
    const newNote: INote = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      createdAt: now,
      updatedAt: now,
      categoryId: data.categoryId,
      tags: data.tags,
      userId: data.userId,
    };

    this.notes.set(newNote.id, newNote);
    return newNote;
  }

  /**
   * Update an existing note
   * @param id Note ID
   * @param data Updated note data
   */
  async update(id: string, data: IUpdateNoteDto): Promise<INote | null> {
    const existingNote = this.notes.get(id);

    if (!existingNote) {
      return null;
    }

    const updatedNote: INote = {
      ...existingNote,
      ...data,
      updatedAt: new Date(),
    };

    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  /**
   * Delete a note
   * @param id Note ID
   */
  async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  /**
   * Find notes by search term in title or content
   * @param searchTerm Search term
   */
  async findBySearchTerm(searchTerm: string): Promise<INote[]> {
    const term = searchTerm.toLowerCase();
    return Array.from(this.notes.values()).filter(
      note => note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term),
    );
  }

  /**
   * Find notes by category ID
   * @param categoryId Category ID
   */
  async findByCategoryId(categoryId: string): Promise<INote[]> {
    return Array.from(this.notes.values()).filter(note => note.categoryId === categoryId);
  }
}
