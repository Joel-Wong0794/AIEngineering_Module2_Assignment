import { createContext, useContext, useReducer, useEffect } from 'react';
import { taskReducer, initialState } from '../reducer/taskReducer';

const TaskContext = createContext(null);
const STORAGE_KEY = 'task-manager-state';

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const filteredTasks = state.tasks.filter((task) => {
    const statusMatches = state.filter === 'all' || task.status === state.filter;
    const priorityMatches = state.priorityFilter === 'all' || task.priority === state.priorityFilter;
    return statusMatches && priorityMatches;
  });

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setPriorityFilter = (priorityFilter) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: priorityFilter });

  const value = {
    tasks: state.tasks,
    filteredTasks,
    filter: state.filter,
    priorityFilter: state.priorityFilter,
    addTask,
    deleteTask,
    updateTask,
    setFilter,
    setPriorityFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}