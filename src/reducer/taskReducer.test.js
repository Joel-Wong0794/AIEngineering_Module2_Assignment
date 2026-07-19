import { describe, it, expect } from 'vitest';
import { taskReducer, initialState } from './taskReducer';

describe('taskReducer', () => {
  it('adds a task on ADD_TASK', () => {
    const newTask = { id: 99, title: 'New', description: 'desc', status: 'todo', priority: 'low' };
    const result = taskReducer(initialState, { type: 'ADD_TASK', payload: newTask });
    expect(result.tasks).toHaveLength(initialState.tasks.length + 1);
    expect(result.tasks).toContainEqual(newTask);
  });

  it('removes a task on DELETE_TASK', () => {
    const idToDelete = initialState.tasks[0].id;
    const result = taskReducer(initialState, { type: 'DELETE_TASK', payload: idToDelete });
    expect(result.tasks).toHaveLength(initialState.tasks.length - 1);
    expect(result.tasks.find((t) => t.id === idToDelete)).toBeUndefined();
  });

  it('replaces a task on UPDATE_TASK', () => {
    const updated = { ...initialState.tasks[0], title: 'Changed title' };
    const result = taskReducer(initialState, { type: 'UPDATE_TASK', payload: updated });
    expect(result.tasks.find((t) => t.id === updated.id).title).toBe('Changed title');
    expect(result.tasks).toHaveLength(initialState.tasks.length);
  });

  it('sets the filter on SET_FILTER', () => {
    const result = taskReducer(initialState, { type: 'SET_FILTER', payload: 'done' });
    expect(result.filter).toBe('done');
  });

  it('sets the priority filter on SET_PRIORITY_FILTER', () => {
    const result = taskReducer(initialState, { type: 'SET_PRIORITY_FILTER', payload: 'high' });
    expect(result.priorityFilter).toBe('high');
  });
  
  it('returns state unchanged for an unknown action', () => {
    const result = taskReducer(initialState, { type: 'NOT_A_REAL_ACTION' });
    expect(result).toBe(initialState);
  });
});
