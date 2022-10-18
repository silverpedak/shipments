# Shipments CRUD page

## Description

This is a React app, that loads shipments data from an API and displays them in a datatable. The API request is done with axios and redux-thunk middleware. Recieved data is stored in Redux store.
If the API returns an error it will display an error message instead.

Each row in the table includes shipment details and two buttons that handle opening modals for editing and deleting the row.

## How to setup

To run this project, follow these instructions:
1. Clone this repo
2. Install dependecies `npm install`
3. Start dev server `npm start`


## Running tests

- Run `npm test .`

## Technologies used

- [React.js](https://reactjs.org/)
- [React Data Table Component](https://www.npmjs.com/package/react-data-table-component) 
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [Testing Library](https://testing-library.com/)
- [Mock Service Worker](https://mswjs.io/)
