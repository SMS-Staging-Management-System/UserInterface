# Staging Management System
## Table of Contents
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)


## Folder Structure

After creation, your project should look like this:

```
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/ - Here should be all of the redux actions
    assets/ - Here would be additional images and such used in the app
    axios/ - Here we create the axios clients for api communication
    components/ - Self explanitory
    include/ - a place to include imports for other libraries such as bootstrap
    model/ - basic objects used in app that typically come from a server
    reducers/ - Redux reducers
    App.scss
    App.tsx
    App.test.tsx
    environment.ts - here is where you can set values that will differ depending on the environment the app is deployed to. Such as the api context.
    index.tsx
    logo.svg
    Store.ts - This is for the Redux store
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.


## Interview List Pagination

Pagination component is from the npm module react-paginate,
click next to proceed to the next page of interviews.
Pagination displays 5 pages to navigate to directly
