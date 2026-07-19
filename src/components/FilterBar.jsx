import { useTasks } from '../context/TaskContext';

function FilterBar() {
  const { filter, setFilter, priorityFilter, setPriorityFilter } = useTasks();

  return (
    <div>
      <label htmlFor="filter-select">Filter by status: </label>
      <select id="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <label htmlFor="priority-filter-select">Filter by priority: </label>
      <select
        id="priority-filter-select"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default FilterBar;
