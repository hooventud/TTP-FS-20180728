import axios from 'axios';

const GOT_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const CURRENT_USER = 'CURRENT_USER';

const defaultUser = {
  currentUser: ''
};

const gotUser = user => ({ type: GOT_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const getUser = user => {
  return async dispatch => {
    try {
      const currentUser = await axios.post('/auth/login', user);
      dispatch(gotUser(currentUser.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = user => {
  return async dispatch => {
    try {
      const currentUser = await axios.post('/auth/signup', user);
      dispatch(gotUser(currentUser.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    try {
      console.log('HERE++++++++>');
      await axios.post('/auth/logout');
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return { ...state, currentUser: action.user };
    case REMOVE_USER:
      return defaultUser;
    case CURRENT_USER:
      return { ...state, currentUser: action.id };
    default:
      return state;
  }
}
