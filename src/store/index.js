import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './reducers/user';
import portfolio from './reducers/portfolio';
import transaction from './reducers/transaction';

const reducer = combineReducers({
  user,
  portfolio,
  transaction
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
export * from './reducers/portfolio';
export * from './reducers/transaction';
