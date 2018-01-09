import { GET_ALL_BOOKS, GET_UNRETURNED_BOOKS, RETURN_BOOK, GET_BORROWED_HISTORY, DELETE_BOOK } from '../actions/types';

const INITIAL_STATE = { category: [], message: '', user: '', allBorrowedBooks: [], allUnreturnedBooks: [], data: [], returned: '' };
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
      console.log(newd, 'newData' )
      return { ...state, allBorrowedBooks: newData };
    }
    case GET_BORROWED_HISTORY:
    return { ...state, allBorrowedBooks: action.data };
    case DELETE_BOOK: {
      const newState = state.data.filter(book => book.id !== action.data);
      return { ...state, count: state.count - 1, data: newState };
    }
    default:
      return state;
  }
}
