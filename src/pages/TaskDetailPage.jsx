import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  if (!task) {
    return (
      <div>
        <p>Task not found.</p>
        <Link to="/tasks">Back to tasks</Link>
      </div>
    );
  }

  function startEditing() {
    setForm({ ...task });
    setIsEditing(true);
  }

  function handleSave(e) {
    e.preventDefault();
    updateTask(form);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setForm(null);
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="edit-description">Description</label>
          <input
            id="edit-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="edit-status">Status</label>
          <select
            id="edit-status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="edit-priority">Priority</label>
          <select
            id="edit-priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: <span data-priority={task.priority}>{task.priority}</span></p>
      <button onClick={startEditing}>Edit</button>
      <Link to="/tasks">Back to tasks</Link>
    </div>
  );
}

export default TaskDetailPage;
