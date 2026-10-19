**English** | [Русский](/README.ru.md)

# Smart Table

An interactive sales table with a full set of features: search, filtering, sorting, pagination, and displaying data fetched from a server.

### View demo: [click](https://yaylnt.github.io/smart-table/)

Filtering and sorting

<img width="1100" height="571" alt="filtering" src="https://github.com/user-attachments/assets/046e6e0a-6cfe-4929-8b31-74161c2435ad" />

Searching, pagination, reset

<img width="1100" height="571" alt="searching+pagination" src="https://github.com/user-attachments/assets/e55098db-2c3b-46ee-bb92-3c036f19be4e" />

## Tech Stack

[![Skills](https://skillicons.dev/icons?i=html,css,js,vite)](https://skillicons.dev/icons?i=html,css,js,vite)

## My Contribution

- Modular architecture: the logic is split into independent modules (table, pagination, filtering, searching, sorting), each following a single pattern: `initModule(settings)` → function `(data, state, action)`.

- Template-based rendering: rows, header, filters, search and pagination are built by cloning templates and binding elements via `data-name`, with no manual DOM lookups.

- A single event handler: `change`, `submit` and `reset` are all routed to one `onAction` call, using `preventDefault`, detecting the pressed button via `e.submitter`, and deferring the call on `reset`.

- Implemented search, filtering, sorting and pagination: filling `select` elements with values from indexes, switching sort direction via a transition map, calculating the number of pages, slicing data, and rendering a limited number of page buttons.

- Migrated from working with local data to an API: components now build a request object (`query`) instead of processing data directly, and the render function became asynchronous and fetches data from the server.

- Implemented `getIndexes` and `getRecords` using `fetch`, `URLSearchParams`, field mapping, and caching by query string with an option to force a refresh.

- Separated the "apply" and "update" stages of the modules: pagination, filter, search and sort parameters are built before the request, while the paginator and status are re-rendered after the data arrives.

- Refactored: comparison and sorting logic was moved to the server, and unused utilities were removed without losing functionality.

- Debugging and verification: tested with different datasets, checked edge cases, manually verified all scenarios and confirmed there are no console errors.