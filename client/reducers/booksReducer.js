import { GET_BOOKS, GET_BORROWED_BOOKS, RETURN_BOOK } from '../actions/types';

const INITIAL_STATE = { userExist: '', category: [], error: '', message: '', user: '', allBorrowedBooks: [], content: '', authenticated: false, data: [], returned: '' };
export default function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, data: action.data };
    case GET_BORROWED_BOOKS:
      return { ...state, allBorrowedBooks: action.data };
    case RETURN_BOOK:
      return { ...state, returned: action.data };
    default:
      return state;
  }
}
