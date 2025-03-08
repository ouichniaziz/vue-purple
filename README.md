# Vue 3 + TypeScript + Vite with json-server

This is a Vue.js application that uses json-server as a mock backend for development purposes.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
```
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:
```
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the json-server mock backend.
The server will be available at [http://localhost:3000](http://localhost:3000).
The database is stored in `db.json` at the root of the project.

### `npm run dev`

Runs the Vue.js application in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles Vue in production mode and optimizes the build for the best performance.

### `npm run preview`

Locally preview the production build.

## Project Structure

```
/
├── public/            # Static files
├── src/               # Source files
│   ├── assets/        # Assets (images, fonts, etc.)
│   ├── components/    # Vue components
│   ├── views/         # Vue views/pages
│   ├── App.vue        # Root component
│   ├── main.js        # Application entry point
│   └── router.js      # Vue Router configuration
├── db.json            # json-server database file
├── json-server.json   # json-server configuration
├── package.json       # npm package configuration
└── vite.config.js     # Vite configuration
```

## Using json-server

The mock API is powered by [json-server](https://github.com/typicode/json-server). You can customize the data in the `db.json` file.

Example routes:
- `GET /employees` - Get all employees
- `GET /employees/1` - Get employee with id 1
- `POST /employees` - Create a new employee
- `PUT /employees/1` - Update employee with id 1
- `DELETE /employees/1` - Delete employee with id 1

For more information, refer to the [json-server documentation](https://github.com/typicode/json-server).

## Development

1. Start the mock backend server:
```
npm run server
```

2. In a separate terminal, start the Vue.js application:
```
npm run dev
```

## Production Deployment

Before deploying to production, make sure to:

1. Replace json-server with a real backend
2. Build the application:
```
npm run build
```

3. Deploy the contents of the `dist` directory to your web server

## License

[MIT](LICENSE)
