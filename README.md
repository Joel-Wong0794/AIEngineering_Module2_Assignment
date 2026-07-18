# Task Manager (Module 2 Assignment)

A React "Task Manager" app built for a Module 2 (Frontend Development) course assignment. Demonstrates `useReducer` for state management, `useContext` for sharing state/dispatch across the component tree, and client-side routing with React Router.

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
- Filter the list by status (All / To do / In progress / Done)
- Add a new task via a form (title, description, status, priority)
- Delete a task
- View a task's full details on its own page (`/tasks/:id`)
- Edit a task's details inline from the detail page

## Bonus features implemented

**Easy**
- Task count summary ("Showing X of Y tasks") that updates with the active filter
- Add-task submit button is disabled while the title or description is empty/whitespace-only

**Medium**
- State persists to `localStorage` — tasks and the active filter survive a page reload
- Tasks can be edited in place from the detail page (`UPDATE_TASK` action + inline edit form)

## Architecture

```
src/
├── reducer/
│   ├── taskReducer.js       Pure reducer: ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_FILTER
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
This project was built with the assistance of Claude Code. I used it as a teaching tool to understand each of the code lines and build each components out myself.