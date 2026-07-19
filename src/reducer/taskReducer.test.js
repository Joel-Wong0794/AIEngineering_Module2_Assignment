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

  it('reorders tasks on REORDER_TASKS, moving the dragged task before the target', () => {
    // id 1 is at index 0, id 3 is at index 2 — removing id 1 shifts id 3
    // down to index 1, which is the case that catches a stale-index bug.
    const result = taskReducer(initialState, {
      type: 'REORDER_TASKS',
      payload: { draggedId: 1, targetId: 3 },
    });
    expect(result.tasks.map((t) => t.id)).toEqual([2, 1, 3, 4, 5, 6]);
  });

  it('reorders tasks on REORDER_TASKS when dragging backward in the list', () => {
    const result = taskReducer(initialState, {
      type: 'REORDER_TASKS',
      payload: { draggedId: 4, targetId: 2 },
    });
    expect(result.tasks.map((t) => t.id)).toEqual([1, 4, 2, 3, 5, 6]);
  });

  it('returns state unchanged when dragging a task onto itself', () => {
    const result = taskReducer(initialState, {
      type: 'REORDER_TASKS',
      payload: { draggedId: 1, targetId: 1 },
    });
    expect(result).toBe(initialState);
  });

  it('returns state unchanged when the target id does not exist', () => {
    const result = taskReducer(initialState, {
      type: 'REORDER_TASKS',
      payload: { draggedId: 1, targetId: 999 },
    });
    expect(result).toBe(initialState);
  });

});
