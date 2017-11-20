import { GET_BOOKS, GET_RENTED_BOOKS } from '../actions/types';

const INITIAL_STATE = { userExist: '', category: [], error: '', message: '', user: '', allRentedBooks: [], content: '', authenticated: false, data: [] };
export default function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, data: action.data };
    case GET_RENTED_BOOKS:
      return { ...state, allRentedBooks: action.data };
    default:
      return state;
  }
}
