import { expect } from 'expect';
import hammerjs from 'hammerjs';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import mockData from '../__mocks__/mockData';

import {
  addBookAction,
  getBooks,
  deleteBookAction,
  editBook,
  getCategoryAction,
  returnBook,
  addCategoryAction,
  getAllBorrowed,
  getHistory
} from '../../actions/BooksActions';


import {
  ADD_BOOK,
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  RETURN_BOOK,
  ADD_CATEGORY,
  GET_CATEGORY,
  GET_ALL_TIME_BORROWED,
  GET_BORROWED_HISTORY
} from '../../actions/types';

dotenv.load();
jest.mock('react-router');
const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = {};

describe('Book actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create ADD_BOOK when a new book is added', () => {
    fetchMock.post('/api/v1/books',
      { status: 201,
        body: JSON.stringify({ message: 'Book added Successfully' })
      });
    const expectedActions = [
      {
        type: ADD_BOOK,
        message: 'Book added Successfully'
      }
    ];
    const store = mockStore({});
    store.dispatch(addBookAction(mockData.bookData))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create GET_ALL_BOOKS when trying to get all books', () => {
    fetchMock.get('/api/v1/books',
      { status: 200, body: JSON.stringify(mockData.returnedBook) });

    const expectedActions = [{
      type: GET_ALL_BOOKS,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    store.dispatch(getBooks())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create EDIT_BOOK when a book is successfully edited', () => {
    fetchMock.put('/api/v1/books/1',
      { status: 200, body: JSON.stringify(mockData.modifiedBook) });

    const expectedActions = [{
      type: EDIT_BOOK,
      data: mockData.modifiedBook
    }];

    const store = mockStore({});
    store.dispatch(editBook(mockData.bookData, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create ADD_CATEGORY when category is successfully added', () => {
    fetchMock.post('/api/v1/books/category',
      { status: 201,
        body: JSON.stringify({
          name: 'drama', description: 'Badass'
        }) });
    const expectedActions = [{
      type: ADD_CATEGORY,
      data: { name: 'science', description: 'Hello world' }
    }];

    const store = mockStore({});
    store.dispatch(addCategoryAction({
      name: 'science',
      description: 'Hello world'
    }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create RETURN_BOOK when returning a book', () => {
    fetchMock.put('/api/v1/users/1/books/1',
      { status: 201 });

    const expectedActions = [{
      type: RETURN_BOOK,
    }];
    const bookId = { bookId: 1 };
    const store = mockStore({});
    store.dispatch(returnBook(1, bookId))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create GET_CATEGORY when getting all category', () => {
    fetchMock.get('/api/v1/books/category',
      { status: 200,
        body: JSON.stringify({
          name: 'drama', description: 'Badass'
        }) });

    const expectedActions = [{
      type: GET_CATEGORY,
      data: [{ name: 'drama', description: 'Badass' }]
    }];

    const store = mockStore({});
    store.dispatch(getCategoryAction())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create GET_ALL_TIME_BORROWED when getting all time borrowed',
    () => {
      fetchMock.get('api/v1/books/borrowed',
        { status: 200
        });

      const expectedActions = [{
        type: GET_ALL_TIME_BORROWED,
        data: {}
      }];

      const store = mockStore({});
      store.dispatch(getAllBorrowed())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });

  it('should create GET_BORROWED_HISTORY when getting history', () => {
    fetchMock.get('/api/v1/users/1',
      { status: 200,
        body: JSON.stringify(mockData.returnedBook)
      });

    const expectedActions = [{
      type: GET_BORROWED_HISTORY,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    store.dispatch(getHistory(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create DELETE_BOOK when a book is successfully deleted', () => {
    fetchMock.deleteOnce('/api/v1/books/1',
      { status: 200, body: JSON.stringify({ id: 1 }) });
    const expectedActions = [
      {
        type: DELETE_BOOK,
        data: 1,
      }
    ];
    const store = mockStore({});
    store.dispatch(deleteBookAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });
});
