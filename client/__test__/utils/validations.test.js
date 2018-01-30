import moxios from 'moxios';
import expect from 'expect';
import hammerjs, { Hammer } from 'hammerjs';
import { checkExisting, checkUser, getDetails } from '../../utils/validations';

const error = { response: { data: { message: 'Not found' } } };

describe('Auth actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: jest.fn(() => Promise.resolve(1)) };
  });
  afterEach(() => moxios.uninstall());

  it('Should get userData from the database', () => {
    moxios.stubRequest('/api/v1/users/existing', {
      status: 200,
      response: { username: 'test', email: 'babadee@gmail.com' }
    });

    const expectedActions = { email: 'babadee@gmail.com' };

    checkExisting('babadee@gmail.com')
      .then((data) => {
        expect(data.email).toEqual(expectedActions);
      })
      .catch(error);
  });

  it('Should validate if username exists', () => {
    moxios.stubRequest('/api/v1/users/checkuser', {
      status: 200,
      response: error
    });

    const expectedActions = { message: 'Not found' };
    getDetails({ name: 'BABAdEe' });
    checkUser('babadee')
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error);
  });
});
