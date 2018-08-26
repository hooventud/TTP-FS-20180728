import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  name: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

const reducers = combineReducers({
  name: reducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

export default store;
