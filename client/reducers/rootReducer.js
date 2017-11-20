import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import books from './booksReducer';
import auth from './authReducer';

export default combineReducers({
  flashMessages,
  books,
  auth,
});
