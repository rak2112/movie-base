import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Latest from '../components/Latest';

describe('<Latest Component/>', () => {

  it(`should have correct props`, () => {
    const state = {
      route: {path: 'latest'}
    };
    const wrapper = shallow(<Latest route={state.route}/>);
    const movies = wrapper.find('Connect(Movies)');
    expect(movies.prop('route').path).to.equal('latest');
    expect(movies.prop('pageName')).to.equal('Latest Movies');
  });
});
