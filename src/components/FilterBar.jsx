import { useTasks } from '../context/TaskContext';

function FilterBar() {
  const { filter, setFilter } = useTasks();

  return (
    <div>
      <label htmlFor="filter-select">Filter by status: </label>
      <select id="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default FilterBar;
