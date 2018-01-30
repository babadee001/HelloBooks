import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { Home, mapStateToProps } from '../../../components/Home';

window.localStorage = {}
configure({ adapter: new Adapter() });
const props = {
  auth: jest.fn(() => Promise.resolve(true))
}

jest.mock('../../../components/NavigationBar');

describe('Component: Home', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<Home {...props} />)
    expect(wrapper.find('div').length).toBe(5); 
    expect(wrapper.find('Link').length).toBe(2);   
    expect(wrapper.find('h1').length).toBe(1); 
  });
  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: 'babadee'
    };
    expect(mapStateToProps(storeState).auth).toHaveLength(7);
  });
})
