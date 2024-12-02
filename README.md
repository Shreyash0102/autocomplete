# Autocomplete Component

A responsive and accessible autocomplete app built using React and TypeScript. This component offers keyboard navigation, search autocomplete and suggestion with debouncing, and integration with API to search for book titles.

Since the api does not always return exactly matching text, try with multiple inputs with so that it returns a book that starts with input text to test the autocomplete feature.
You can pick the input from any of the suggestions.
Some inputs tried were - 
1) great e
2) harry
3) macb

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`
Install necessary dependencies for this project

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Features

### Autocomplete Functionality
- Displays search suggestions based on user input.
- Highlights the matching portion of the suggestion directly in the input field.

### Accessibility
- Keyboard navigation support:
  - **Arrow keys**: Navigate through suggestions.
  - **Enter key**: Select the currently highlighted suggestion.
  - **Tab key**: Focus the widget.
- Accessible via screen readers with proper ARIA attributes.

### API Integration
- Integrated with the Open Library API to fetch search results.

### Debounced Input
- Reduces API calls with debouncing for better performance.

### Responsive Design
- Responsive to different screen sizes and resolutions.
