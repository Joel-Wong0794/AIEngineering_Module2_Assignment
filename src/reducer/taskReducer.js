export const initialState = {
  tasks: [
    { id: 1, title: 'Set up CRM pipeline', description: 'Define stages for the sales pipeline', status: 'todo', priority: 'high' },
    { id: 2, title: 'Import client contacts', description: 'Upload CSV of existing clients', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Draft onboarding email', description: 'Write welcome email for new clients', status: 'done', priority: 'low' },
    { id: 4, title: 'Review Q1 sales report', description: 'Check numbers against targets', status: 'todo', priority: 'high' },
    { id: 5, title: 'Schedule client demo', description: 'Book a call with a prospective client', status: 'in-progress', priority: 'medium' },
    { id: 6, title: 'Update CRM documentation', description: 'Document new pipeline stages for the team', status: 'done', priority: 'low' },
  ],
  filter: 'all',
  priorityFilter: 'all',
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_PRIORITY_FILTER':
      return { ...state, priorityFilter: action.payload };
      
    default:
      return state;
  }
}
