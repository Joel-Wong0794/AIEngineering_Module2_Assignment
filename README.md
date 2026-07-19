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

## How it all fits together

A brief explanation through each file, in the order the app was built (leaves first — least dependent first). We will use one user session to explain tying it all together.

### `reducer/taskReducer.js` — the foundation
Plain JavaScript, no React. `initialState` is the seed data (6 tasks) plus `filter: 'all'` and `priorityFilter: 'all'`. `taskReducer(state, action)` is a `switch` over `action.type`; every branch returns a **new** state object, never mutating in place. Six actions: `ADD_TASK`, `DELETE_TASK`, `UPDATE_TASK`, `SET_FILTER`, `SET_PRIORITY_FILTER`, `REORDER_TASKS`. This is the only place state logic lives.

### `context/TaskContext.jsx` — the bridge
`TaskProvider` runs `useReducer(taskReducer, initialState, loadInitialState)` once. The third argument, `loadInitialState`, is a *lazy initializer* — called only on mount — that reads `localStorage` and spreads it over `initialState` (`{ ...initialState, ...saved }`), so any field missing from an older save still gets a safe default instead of coming back `undefined`. A `useEffect` keyed on `state` writes the whole state back to `localStorage` on every change. `filteredTasks` is **derived**, not stored — recomputed every render from `state.tasks`, ANDing the status and priority predicates. All of that, plus six thin dispatch-wrapper functions (`addTask`, `deleteTask`, `updateTask`, `setFilter`, `setPriorityFilter`, `reorderTasks`), gets bundled into one `value` object broadcast via `<TaskContext.Provider value={value}>`. `useTasks()` is the one-line hook any component uses to read that broadcast — there's only one provider in the whole app, so every call resolves to the same object.

### `main.jsx` — the entry point
Finds `<div id="root">` in `index.html` and mounts `<App />` into it, wrapped in `StrictMode` (a dev-only helper that double-invokes some functions to help surface bugs).

### `App.jsx` — routing skeleton
```jsx
<TaskProvider>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/tasks" element={<TaskListPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
    </Routes>
  </BrowserRouter>
</TaskProvider>
```
`TaskProvider` sits *outside* `BrowserRouter`, so every routed page can call `useTasks()`. `<Header />` sits outside `<Routes>`, so it stays on-screen across every route. `/` immediately redirects to `/tasks`; `/tasks/:id`'s `:id` is a URL parameter, read via `useParams()`.

### `components/Header.jsx`
Static markup only — no state, no context, no props.

### `components/FilterBar.jsx`
Reads `filter`/`setFilter`/`priorityFilter`/`setPriorityFilter` from `useTasks()`. Two controlled `<select>`s — React owns each `value`, and `onChange` dispatches through the matching setter, closing the standard controlled-input loop.

### `components/TaskList.jsx`
Reads `filteredTasks`/`deleteTask`/`reorderTasks`. Delete is a direct `onClick` dispatch. Drag-and-drop uses one piece of *local* `useState` (`draggingId`) purely for the `.dragging` visual — `onDragStart` records the dragged id, `onDragOver` calls `preventDefault()` (required for a drop to be allowed at all), `onDrop` is the only handler that actually touches the reducer (`reorderTasks(draggingId, task.id)`), and `onDragEnd` always resets `draggingId` back to `null`, whether the drop succeeded or not.

### `components/AddTaskForm.jsx`
Five pieces of state: `title`/`description`/`status`/`priority` are all local (in-progress form input, not app data yet), and only `tasks` (read-only) comes from context, used to compute `nextId = Math.max(...tasks.map(t => t.id), 0) + 1`. `isDisabled` is recalculated every render from whether title/description are blank (Bonus Easy). On submit: `addTask({...})` dispatches, then all four local fields reset — the form clears itself via local state, not anything the reducer does.

### `pages/TaskListPage.jsx`
Pure composition, no logic of its own. Renders `<AddTaskForm />`, `<FilterBar />`, a count line (`Showing {filteredTasks.length} of {tasks.length} tasks` — Bonus Easy), and `<TaskList />`. Only destructures `tasks`/`filteredTasks` for that count line; every child component calls `useTasks()` independently for its own slice, rather than receiving props forwarded down from this page.

### `pages/TaskDetailPage.jsx`
`useParams()` returns `{ id }` **as a string**, so `Number(id)` is required before comparing against `task.id` (a number). No match → early-return a "Task not found" view. `isEditing`/`form` are local state: `form` is seeded from the task *once*, only when "Edit" is clicked (`setForm({ ...task })`) — not synced continuously via an effect, which avoids the "effect just to mirror state" anti-pattern. "Save" calls `updateTask(form)` with the *whole* edited object (matching `UPDATE_TASK`'s full-object contract); "Cancel" just discards `form` without dispatching anything.

### One user session, start to end
1. Browser loads `/` → redirected to `/tasks` → `TaskListPage` renders. `TaskProvider` (mounted once, above the router) has already loaded `state` from `localStorage` or the seed data.
2. User sets `status = todo` and `priority = high` in `FilterBar` → two dispatches → reducer returns new state twice → `filteredTasks` recomputes with both predicates ANDed → `TaskList` re-renders showing only the matching tasks.
3. User drags one visible row onto another → `TaskList`'s local `draggingId` tracks the gesture; `onDrop` calls `reorderTasks(draggedId, targetId)` → `REORDER_TASKS` repositions both tasks *in the full `state.tasks` array*, located by id → re-render → the new order is written to `localStorage`.
4. User clicks a task's title → React Router swaps to `/tasks/:id` → `TaskDetailPage` finds the task by numeric id and shows its detail view.
5. User clicks "Edit", changes a field, clicks "Save" → `updateTask(form)` dispatches `UPDATE_TASK` → reducer replaces that one task → persisted again.
6. User navigates back to `/tasks` — `TaskProvider` never unmounted (it's above the router), so the edited task and the new order are both still there.

One reducer, one provider, many independent readers — all synchronized through context and mirrored into `localStorage`.

## AI Tool Usage Disclosure
This project was built with the assistance of Claude Code. I used it as a teaching tool to understand each of concepts, scripts and eventually build up each components out myself.
