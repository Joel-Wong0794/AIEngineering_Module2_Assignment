import { createContext, useContext, useReducer } from 'react';
import { taskReducer, initialState } from '../reducer/taskReducer';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const filteredTasks =
    state.filter === 'all'
      ? state.tasks
      : state.tasks.filter((task) => task.status === state.filter);

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });

  const value = {
    tasks: state.tasks,
    filteredTasks,
    filter: state.filter,
    addTask,
    deleteTask,
    updateTask,
    setFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}
