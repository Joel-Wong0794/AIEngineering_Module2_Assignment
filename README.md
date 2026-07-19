# Task Manager
<img width="617" height="887" alt="image" src="https://github.com/user-attachments/assets/e418f407-5240-4530-aa9a-19a3a4f3370e" />

A React "Task Manager" app built for a Frontend Development course assignment. Demonstrates `useReducer` for state management, `useContext` for sharing state/dispatch across the component tree, and client-side routing with React Router.

## Tech stack

- React 19
- React Router DOM v7 (client-side routing)
- Vite (build tool / dev server)
- Vitest (unit testing)

## Getting started

```bash
npm install
npm run dev 
```
## Other available commands

```bash
npm test         # run the reducer test suite (vitest run)
npm run build    # production build
npm run preview  # preview the production build locally
```

## Features

- View all tasks in a list, each showing title, status, and priority
- Filter the list by status and priority at the same time (both filters combine with AND logic)
- Reorder tasks by dragging and dropping rows in the list
- Add a new task via a form (title, description, status, priority)
- Delete a task
- View a task's full details on its own page (`/tasks/:id`)
- Edit a task's details inline from the detail page

## Additional features implemented ("Bonus Challenges")

**Easy**
- Task count summary ("Showing X of Y tasks") that updates with the active filter
- Add-task submit button is disabled while the title or description is empty/whitespace-only

**Medium**
- State persists to `localStorage` — tasks and the active filter survive a page reload
- Tasks can be edited in place from the detail page (`UPDATE_TASK` action + inline edit form)

**Hard**
- Combined status + priority filtering — both filters can be active simultaneously (`priorityFilter` state + `SET_PRIORITY_FILTER` action, AND-combined when deriving `filteredTasks`)
- Drag-and-drop task reordering using native HTML5 drag events, no library (`REORDER_TASKS` action repositions tasks by id in the underlying array, so the new order persists to `localStorage` and stays correct even when reordering while a filter is active)

## Architecture

```
src/
├── reducer/
│   ├── taskReducer.js       Pure reducer: ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_FILTER, SET_PRIORITY_FILTER, REORDER_TASKS
│   └── taskReducer.test.js  Unit tests (test-first for every action)
├── context/
│   └── TaskContext.jsx      TaskProvider + useTasks() hook; persists state to localStorage
├── components/
│   ├── Header.jsx
│   ├── FilterBar.jsx
│   ├── TaskList.jsx
│   └── AddTaskForm.jsx
└── pages/
    ├── TaskListPage.jsx     Composes FilterBar + TaskList + AddTaskForm
    └── TaskDetailPage.jsx   Task detail view + inline edit
```

Routes: `/` redirects to `/tasks`, `/tasks` shows the list, `/tasks/:id` shows a single task's detail/edit view.

## AI Tool Usage Disclosure
This project was built with the assistance of Claude Code. I used it as a teaching tool to understand each of concepts, scripts and eventually build up each components out myself.
