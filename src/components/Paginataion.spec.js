import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import MoviesPagination from '../components/Pagination';

chai.use(sinonChai);
describe('<MoviesPagination />', () => {

  it(`should give a 'menu-item' class`, () => {
    const state = {
      pageNo: 1, itemToDisplay: 5, onPageChange: sinon.spy()
    };
    const wrapper = shallow(<MoviesPagination {...state}/>);
    const pagination = wrapper.find('Pagination');
    wrapper.simulate('select', 5);
    expect(state.onPageChange).to.have.been.calledWith(5);
    expect(pagination.prop('activePage')).to.equal(1);
    expect(pagination.prop('maxButtons')).to.equal(5);
  });
});
