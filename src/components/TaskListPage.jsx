import { useTasks } from '../context/TaskContext';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';

function TaskListPage() {
  const { tasks, filteredTasks } = useTasks();

  return (
    <div>
      <AddTaskForm />
      <FilterBar />
      <p>
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
      <TaskList />
    </div>
  );
}

export default TaskListPage;
