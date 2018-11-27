import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './reducers/user';
import liveFeed from './reducers/liveFeed';
import portfolio from './reducers/portfolio';
import currentPage from './reducers/currentPage';
import transaction from './reducers/transaction';

const reducer = combineReducers({
  user,
  liveFeed,
  portfolio,
  currentPage,
  transaction
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
export * from './reducers/liveFeed';
export * from './reducers/portfolio';
export * from './reducers/currentPage';
export * from './reducers/transaction';
