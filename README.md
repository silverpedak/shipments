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


## Assessment goal

Create an HTML Page with relevant Javascript to:

- Load shipments data with AJAX from https://my.api.mockaroo.com/shipments.json?key=5e0b62d0
(Note that that link might get overloaded, so you can also use off line version renaming shipment.txt file)
- Display data in generated table (see attachment ShipmentsTable.png as example) 
- Provide a button in the table to open a panel to visualize details of single row (see attachment ShipmentsDetails.png as example) 

TECH:
- You can implement it with vanilla javascript
- More points if you implement it with React

BENEFICIAL ADDITIONAL POINTS:
	
- Use one CSS template (for example get some from here: https://www.creative-tim.com/templates/free)
- Implement delete button on the table
- Implement update on Details panel (field values could be changed in the UI)
- Use Axios
- Use React + Redux
- Use React + Redux + Thunk middleware
