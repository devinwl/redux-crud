# redux-crud

A basic set of reusable Redux actions, reducers and epics that implement a set of CRUD (create, read, update, and delete) actions.

Using the `createNamedReducer` reducer, it's possible to create a specific named reducer that responds only to actions of the same name.  This allows for a reusable set of code for named types that have the same set of features and differ only by name.

## Example usage

In this example there is a set of data called `posts`.  Using the `createNamedReducer` and `createNamedAction` functions - there is now reducers and actions tied specifically to the `posts` data type.

Calling `fetchAllPosts` fetches all the `posts` data, but does not require any additional code beyond defining the reducer and action(s).

```
import { reducer, createNamedReducer } from './reducers/crud';

export const rootReducer = combineReducers({
	posts: createNamedReducer('posts', reducer)
});
```

```
import { createNamedAction, fetchAllItems } from './actions/crud';

export const fetchAllPosts = () => createdNamedAction('posts', fetchAllItems);
```