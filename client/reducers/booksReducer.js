import { GET_ALL_BOOKS, GET_UNRETURNED_BOOKS, RETURN_BOOK, GET_BORROWED_HISTORY, DELETE_BOOK, GET_ALL_TIME_BORROWED, EDIT_BOOK } from '../actions/types';

const INITIAL_STATE = { category: [], allTimeBorrowed: '',  message: '', user: '', allBorrowedBooks: [], allUnreturnedBooks: [], data: [], returned: '' };
export default function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    case GET_UNRETURNED_BOOKS:
      return { ...state, allUnreturnedBooks: action.data };
    case RETURN_BOOK: {
      const newData = [];
      state.allBorrowedBooks.map((book) => {
        if (book.bookId === action.data.id) {
          book.returned = true;
        }
        newData.push(book);
      });
      return { ...state, allBorrowedBooks: newData };
    }
    case GET_BORROWED_HISTORY:
    return { ...state, allBorrowedBooks: action.data };
    case DELETE_BOOK: {
      const newState = state.data.filter(book => book.id !== action.data);
      return { ...state, count: state.count - 1, data: newState };
    }
    case GET_ALL_TIME_BORROWED:
    return { ...state, allTimeBorrowed: action.data }
    case EDIT_BOOK: {
      const newData = [];
      state.data.map((book) => {
        if (book.id === action.data.id) {
          newData.push(action.data);
        } else {
          newData.push(book);
        }
      });
      return { ...state, data: newData };
    }
    default:
      return state;
  }
}
