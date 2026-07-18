import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function AddTaskForm() {
  const { tasks, addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  const isDisabled = title.trim() === '' || description.trim() === '';

  function handleSubmit(e) {
    e.preventDefault();
    const nextId = Math.max(...tasks.map((t) => t.id), 0) + 1;
    addTask({ id: nextId, title, description, status, priority });
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" disabled={isDisabled}>
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
