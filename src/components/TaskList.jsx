import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskList() {
  const { filteredTasks, deleteTask } = useTasks();

  if (filteredTasks.length === 0) {
    return <p>No tasks match the current filter.</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
          {' — '}
          {task.status} / {task.priority}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
