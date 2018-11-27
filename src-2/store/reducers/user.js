import axios from 'axios'

const GOT_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CURRENT_USER = 'CURRENT_USER'

const defaultUser = {
  currentUser: ''
}

const gotUser = user => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getCurrent = id => ({type: CURRENT_USER, id})

export const getUser = (user) => {
  return dispatch => {
    dispatch(gotUser(user))
  }
}

export const currentUser = email => {
  return async dispatch => {
    try {
      const response =await axios.get(`/api/users?email=${email}`)
    dispatch(getCurrent(response.data.id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    dispatch(removeUser())
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CURRENT_USER:
      return {...state, currentUser: action.id}
    default:
      return state
  }
}
