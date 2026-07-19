import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskList() {
  const { filteredTasks, deleteTask, reorderTasks } = useTasks();
  const [draggingId, setDraggingId] = useState(null);

  if (filteredTasks.length === 0) {
    return <p>No tasks match the current filter.</p>;
  }

  function handleDragStart(e, taskId) {
    setDraggingId(taskId);
    e.dataTransfer.setData('text/plain', String(taskId));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, targetId) {
    e.preventDefault();
    reorderTasks(draggingId, targetId);
  }

  function handleDragEnd() {
    setDraggingId(null);
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, task.id)}
          onDragEnd={handleDragEnd}
          className={task.id === draggingId ? 'dragging' : undefined}
        >
          <Link to={`/tasks/${task.id}`} draggable={false}>{task.title}</Link>
          {' — '}
          {task.status} / <span data-priority={task.priority}>{task.priority}</span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;