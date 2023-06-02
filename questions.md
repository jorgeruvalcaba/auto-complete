# Questions

1. What is the difference between Component and PureComponent? give an example
   where it might break my app.

The difference is that `PureComponent` implements `shouldComponentUpdate`, which
do a shallow comparison of its props and state.

`PureComponent` might break an app if its props are modified in a way that their
reference doesn't change, but their content does. If this happens the shallow
comparison will not detect the changes and the component won't rerender, like in
the following example:

```tsx
import React, { PureComponent } from 'react'

class MyComponent extends PureComponent {
  handleClick = () => {
    const { user } = this.props
    user.name = 'John Doe'
  }

  render() {
    const { user } = this.props
    return (
      <div>
        {' '}
        <p>
          User Name:
          {user.name}
        </p> <button onClick={this.handleClick}>Change Name</button>{' '}
      </div>
    )
  }
}
```

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because if some component children of `Context` doesn't render, the children of
this component can work with inconsistent `Context` values.

3. Describe 3 ways to pass information from a component to its PARENT.

- Using some state management library like Redux, Recoil, etc.
- Using Context API.
- Using a callback function provided via props.

4. Give 2 ways to prevent components from re-rendering.

- Using `React.memo` or `React.useMemo()`
- Using `React.useCallback()`

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

A `Fragment` element allow us to group multiple elements without adding another
wrapping node.

```tsx
const App = () => {
  return (
    <Fragment>
      <h1>Header</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </Fragment>
  )
}
```

A Fragment might break an app if for some reason break the node hierarchy of the
app. If in the above example its expected that `App` should have a specific
compoment tree structure and it doesn't, it would break the expected structure
and maybe have styling issues.

6. Give 3 examples of the HOC pattern.

Similar as hooks, we can create HOC to reuse code in components. Basically it
receives and returns a component.

```js
// Example 1
const withAuthentication = (Component) {
  return (props) {
    if (props.isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <LoginPage>
    }
  }
}

// Example 2
const withLogging = (Component) => {
  return (props) => {
    const logEvent = (eventName) => {
      console.log(`Event: ${eventName}`);
    };

    return (
      <div>
        <WrappedComponent {...props} onEvent={logEvent} />
      </div>
    );
  };
};

// Example 3
const withGrantedRole = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} role={isAdmin(props.role) ? props.role : ADMIN } />;
  };
};
```

7. What's the difference in handling exceptions in promises, callbacks and
   async...await.

The difference is the syntax and the flow control.

### Promises

```js
Promise.then(result => {
  // do something with result
})
  .catch(error => {
    // do something with error
  })
  .finally(result => {
    // do something at the end of both
  })
```

### Callbacks

```js
const onSuccess = result => {
  // do something with result
}

const onFailure = error => {
  // do something with error
}

simpleFn(onSuccess, onFailure)
```

### Async await

```js
const AsyncFn = async () => {
  try {
    const result = await Promise()
    // do something with result
  } catch (error) {
    // do something with exception
  } finally {
    // do something at the end of both
  }
}
```

8. How many arguments does setState take and why is it async.

It takes two: callback and state. It is async because it makes the setState
calls in batches for a better performance.

9. List the steps needed to migrate a Class to Function Component.

- Replace the `class` declaration and structure with a function declaration and
  structure.
- Pass all props as arguments.
- Move any state variables in the constructor using the `useState` hook.
- Replace any lifecycle methods with their equivalent hooks.
- Replace any method with a function inside the component.
- Update any reference to `this`.

1. List a few ways styles can be used with components.

- CCS-in-JS.
- CSS Modules
- Inline using `style` prop.
- Using classes.

11. How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML`.
