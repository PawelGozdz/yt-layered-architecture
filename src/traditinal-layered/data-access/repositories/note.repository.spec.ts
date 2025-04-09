import { describe, it, expect, beforeEach } from 'vitest';

import { NoteRepository } from './note.repository';
import { ICreateNoteDto } from '@common/models/note.model';

describe('Traditional Layered - NoteRepository', () => {
  let repository: NoteRepository;

  beforeEach(() => {
    repository = new NoteRepository();
  });

  it('should create a new note', async () => {
    // Arrange
    const noteData: ICreateNoteDto = {
      title: 'Test Note',
      content: 'This is a test note content',
      categoryId: 'category1',
      tags: ['test', 'note'],
      userId: 'user1',
    };

    // Act
    const createdNote = await repository.create(noteData);

    // Assert
    expect(createdNote).toBeDefined();
    expect(createdNote.id).toBeDefined();
    expect(createdNote.title).toBe(noteData.title);
    expect(createdNote.content).toBe(noteData.content);
    expect(createdNote.categoryId).toBe(noteData.categoryId);
    expect(createdNote.tags).toEqual(noteData.tags);
    expect(createdNote.userId).toBe(noteData.userId);
    expect(createdNote.createdAt).toBeInstanceOf(Date);
    expect(createdNote.updatedAt).toBeInstanceOf(Date);
  });

  it('should find a note by ID', async () => {
    // Arrange
    const noteData: ICreateNoteDto = {
      title: 'Test Note',
      content: 'This is a test note content',
    };
    const createdNote = await repository.create(noteData);

    // Act
    const foundNote = await repository.findById(createdNote.id);

    // Assert
    expect(foundNote).toBeDefined();
    expect(foundNote?.id).toBe(createdNote.id);
    expect(foundNote?.title).toBe(createdNote.title);
    expect(foundNote?.content).toBe(createdNote.content);
  });

  it('should return null when note is not found', async () => {
    // Act
    const foundNote = await repository.findById('non-existent-id');

    // Assert
    expect(foundNote).toBeNull();
  });

  it('should update a note', async () => {
    // Arrange
    const noteData: ICreateNoteDto = {
      title: 'Test Note',
      content: 'This is a test note content',
    };
    const createdNote = await repository.create(noteData);
    const updateData = {
      title: 'Updated Test Note',
      content: 'This is an updated test note content',
    };

    // Act
    const updatedNote = await repository.update(createdNote.id, updateData);

    // Assert
    expect(updatedNote).toBeDefined();
    expect(updatedNote?.id).toBe(createdNote.id);
    expect(updatedNote?.title).toBe(updateData.title);
    expect(updatedNote?.content).toBe(updateData.content);
    expect(updatedNote?.createdAt).toEqual(createdNote.createdAt);
    expect(updatedNote?.updatedAt.getTime()).toBeGreaterThanOrEqual(createdNote.updatedAt.getTime());
  });

  it('should delete a note', async () => {
    // Arrange
    const noteData: ICreateNoteDto = {
      title: 'Test Note',
      content: 'This is a test note content',
    };
    const createdNote = await repository.create(noteData);

    // Act
    const result = await repository.delete(createdNote.id);
    const foundNote = await repository.findById(createdNote.id);

    // Assert
    expect(result).toBe(true);
    expect(foundNote).toBeNull();
  });

  it('should find all notes', async () => {
    // Arrange
    await repository.create({
      title: 'Note 1',
      content: 'Content 1',
    });
    await repository.create({
      title: 'Note 2',
      content: 'Content 2',
    });

    // Act
    const allNotes = await repository.findAll();

    // Assert
    expect(allNotes).toHaveLength(2);
    expect(allNotes.some(note => note.title === 'Note 1')).toBe(true);
    expect(allNotes.some(note => note.title === 'Note 2')).toBe(true);
  });

  it('should find notes by search term', async () => {
    // Arrange
    await repository.create({
      title: 'First Note',
      content: 'Some content',
    });
    await repository.create({
      title: 'Second Note',
      content: 'Content with search term',
    });
    await repository.create({
      title: 'Third Note',
      content: 'Another content',
    });

    // Act
    const foundNotes = await repository.findBySearchTerm('search term');

    // Assert
    expect(foundNotes).toHaveLength(1);
    expect(foundNotes[0].title).toBe('Second Note');
  });

  it('should find notes by category ID', async () => {
    // Arrange
    await repository.create({
      title: 'Note 1',
      content: 'Content 1',
      categoryId: 'category1',
    });
    await repository.create({
      title: 'Note 2',
      content: 'Content 2',
      categoryId: 'category2',
    });
    await repository.create({
      title: 'Note 3',
      content: 'Content 3',
      categoryId: 'category1',
    });

    // Act
    const foundNotes = await repository.findByCategoryId('category1');

    // Assert
    expect(foundNotes).toHaveLength(2);
    expect(foundNotes.every(note => note.categoryId === 'category1')).toBe(true);
  });
});