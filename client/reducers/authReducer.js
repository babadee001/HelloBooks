import {
  SET_CURRENT_USER, UNAUTH_USER, GET_ALL_USERS
} from '../actions/types';

const INITIAL_STATE = {
  userExist: '',
  error: '',
  message: '',
  user: { currentUser: { isadmin: 0 } },
  content: '',
  authenticated: false,
  data: ''
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNAUTH_USER:
      return { ...state, error: '', message: 'Successfully Logged Out', authenticated: false };
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
      case GET_ALL_USERS:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default authReducer;

