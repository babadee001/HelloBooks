import expect from 'expect';
import hammerjs from 'hammerjs';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import fetchMock from 'fetch-mock';
import mockData from '../__mocks__/mockData';
import { setCurrentUser,
  userSignupRequest,
  editProfileAction,
  userSigninRequest,
  googleSigninRequest
} from '../../actions/AuthActions';
import { SET_CURRENT_USER,
  EDIT_PROFILE,
  UNAUTH_USER
} from '../../actions/types';

dotenv.load();

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = {
  removeItem: () => {},
  setItem: () => {}
};


describe('Auth actions', () => {
  beforeEach(() => {
    global.Materialize = { toast: jest.fn(Promise.resolve(1)) };
    moxios.install();
    global.Materialize = { toast: jest.fn(() => Promise.resolve(1)) };
  });
  afterEach(() => moxios.uninstall());

  it('should create SET_CURRENT_USER', () => {
    const user = {
      username: 'babadee',
      email: 'babadee@gmail.com',
    };

    const expectedAction = {
      decoded: {
        currentUser:
          {
            type: SET_CURRENT_USER,
            user,
            authenticated: true
          }
      }
    };
    expect(setCurrentUser(user))
      .toEqual(expectedAction.decoded.currentUser);
  });

  it('should create SET_CURRENT_USER when login action is successful', () => {
    fetchMock.post('api/v1/users/signin',
      { status: 200,
        body: JSON.stringify(mockData.user)
      });

    const expectedActions = {
      type: SET_CURRENT_USER,
      user: mockData.user
    };

    const store = mockStore({});
    store.dispatch(userSigninRequest(mockData.user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should create SET_CURRENT_USER when on googleSigninRequest success ',
    () => {
      const { authResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: authResponse
      });
      const store = mockStore({});
      store.dispatch(googleSigninRequest({}));
    });


  it('should set UNAUTH_USER when user logs out of the application', () => {
    const expectedActions = {
      type: UNAUTH_USER,
      user: { },
      authenticated: false
    };

    const store = mockStore({});
    store.dispatch(expectedActions);
    expect(store.getActions()[0]).toEqual(expectedActions);
  });

  it('should create SET_CURRENT_USER when signup action is successful', () => {
    fetchMock.post('api/v1/users/signup',
      { status: 201,
        body: JSON.stringify(mockData.user)
      });

    const expectedActions = {
      type: SET_CURRENT_USER,
      user: mockData.user
    };

    const store = mockStore({});
    store.dispatch(userSignupRequest(mockData.user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should create EDIT_PROFILE when user edit profile', () => {
    moxios.stubRequest('/api/v1/users/edit/1', {
      status: 200,
      response: {
        token: process.env.testToken
      }

    });
    const expectedActions = {
      type: EDIT_PROFILE,
    };

    const store = mockStore({});
    store.dispatch(editProfileAction(1, { username: 'james' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });
});
