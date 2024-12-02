# What is the difference between Component and PureComponent? Give an example where it might break my app.
**Component** - React re renders a component whwnever its parent renders or its props or state have changed. To avoid this shouldComponentUpdate must be implemented explicitly.
**Pure component** - Pure components provide a default implementation of shouldComponentUpdate with shallow comparison of props and state. This prevents unnecessary rerenders if props or state have not changed
```jsx
class X extends PureComponent {
  render() {
    return <h1>{this.props.message}</h1>;
  }
}
const memoizedX = memo(function X({ message }) {
  return <h1>{message}</h1>;
});
```
Using pure components might break the app when using nested objects as state or props. It might fail to re render as it only uses shallow comparison.

# Context + ShouldComponentUpdate might be dangerous. Why is that?
This is because shouldComponentUpdate only compares state and props, so any change in context might not trigger a re render for such a component

# Describe 3 ways to pass information from a component to its PARENT.

## 1) Using callback functions
```jsx
function Parent() {
  const onChildSend = (data) => {
    console.log(`Child send data: ${data}`);
  };
  return <Child onChildSend={onChildSend} />;
};

const Child = ({ onChildSend }) => {
  const sendData = () => {
    onChildSend('Hello!');
  };
  return <button onClick={sendData}>Send Data to Parent</button>;
};
```
## 2) Using react context api
Context API can be used to exchange information deep down without explicitly passing props. React.createContext creates a context object which other components can provide or subscribe to
```jsx
const ThemeContext = React.createContext('light');

const ThemedComponent = () => {
  const theme = React.useContext(ThemeContext);
  return <div>{`Current theme: ${theme}`}</div>;
};

const App = () => {
  const [theme, setTheme] = React.useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
};
```
## 3) Using custom hook
We can take the example of useAutoComplete hook in this project. It can be used by multiple components and they can communicate with each other via methods provided by the hook - setQuery, setCurrIndex, etc to update the state - query, currIndex, etc which the components can subscribe to.

# Give 2 ways to prevent components from re-rendering.
## 1) React.memo
React.memo prevents re render if props have not changed. You can pass a function with custom comparison logic
```jsx
const MemoizedComponent = memo(function Compnent(props) {
  // ...
}, (prevProps, nextProps) => prevProps.x === nextProps.x);
```
## 2) useCallback
useCallback hook is used to cache a function definition between rerenders based on array of dependencies. This is useful when passing a callback function to child component. In combination with useMemo it can be used to avoid rerendering of child if the cached function has not changed.

## 3) Split component
Splitting a component into smaller components can isolate state and props to individual component and minimize renders

# What is a fragment and why do we need it? Give an example where it might break my app.
<React.Fragment> or <> is used to group multiple elements without wrapping them with new node like div, etc.
It can avoid DOM from cluttering with new nodes that dont serve any other purpose and can improve performance

If you require to render list of elements using a loop, you need to assign a key to elements. In that case you cant use <></>. You need to pass the key prop to <React.Fragment key={key}></React.Fragment>

# Give 3 examples of the HOC pattern.
HOC pattern can be used for reusing logic like error logging, instrumenattaion, fetching data, etc

## 1) Logging
```jsx
const wrapLogger = (WrappedComponent) => {
  return (props) => {
    console.log(props);
    return <WrappedComponent {...props} />;
  };
};

const Component = ({ label }) => <button>{label}</button>;

const LoggedComponent = wrapLogger(Component);
```

## 2) Data fetching
```jsx
const dataLoader = (url) => (Component) => {
  return (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, [url]);

    if (loading) return <div>Loading...</div>;

    return <Component {...props} data={data} />;
  };
};
```

## 3) Conditional rendering
```jsx
const wrapAuthHandler = (Component) => {
  return ({ isAuthorized, ...props }) => {
    if (!isAuthorized) {
      return <div>You are not authorized to view this content</div>
    }
    return <Component {...props} />
  }
}
```

# What's the difference in handling exceptions in promises, callbacks and async...await?
1.) Promises use .catch() for handling exceptions. Any error in a promise chain can be caught by a .catch() at the end of the chain.
```js
fetch(URL)
  .then((res) => {
    if (!res.ok) throw new Error("Error");
    return res.json();
  })
  .then((res) => console.log(res))
  .catch((err) => console.log("Error:", err));
```
2.) In callbacks, the callback method has to do manual error handling, the first argument usually used to pass the error and second argument used to pass the response
```js
fetchData((err, data) => {
  if (err) {
    console.error("Error occurred:", err);
    return;
  }
  console.log(data);
});
```
3.) In async...await, you can use try catch blocks for error handling
```js
async function fetchData () {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error:", error);
  }
};
```
# How many arguments does setState take and why is it async.
setState takes 2 arguments -
1.) function to update state - (prevState,props) => newState or an object/value to merge into current state
2.) callback function to execute afer state has been updated and component rendered

It is async to improve performance - react can batch multiple state updates to prevent unnecessary rerenders.

# List the steps needed to migrate a Class to Function Component.
1.) Define a function with name as component name. Move the code from render() to this function. In the arguments of this function you can acept the destructured props like function Component( { id, name })
2.) Define state if any using useState() hook, define functions for all event handlers
3.) replace all references of this with state variables, props, functions just defined by you. If your component uses context like this.context convert it to const contextObj = useContext(Context)
4.) Implement the lifecycle methods using useEffect hook

# List a few ways styles can be used with components.
## 1.) Inline styles
Pass style as object with camel cased keys as css properties to style attribute of html elements
```jsx
<button style={{display: 'flex', marginLeft: '10px'}}>Click Me</button>;
```
## 2.) Style sheets
Define styles in a .css stylesheet which can be imported by the component file. You can use css selectors like classname, id etc to apply styles
```css
.button {
  background-color: blue;
  padding: 8px;
}
```
## 3.) css in js using emotion
```jsx
import { css } from "@emotion/react";

const elStyle = css`
  background-color: blue;
  padding: 8px;
`;

<input css={elStyle} type="text" />
```
# How to render an HTML string coming from the server.
The html string must be sanitized using a library like DOMPurify to avoid xss and other security concerns and then can be rendered using dangerouslySetInnerHTML attribute
```jsx
<div
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlStr) }}
/>
```
