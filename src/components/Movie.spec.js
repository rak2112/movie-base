import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Movie from '../components/Movie';

describe('<Movie />', () => {

  it(`should give a 'movie' class`, () => {
    const state = {
      movie: {title: 'Terminator', vote_average: '7'},
      genres :[{id:1, name: 'Action'}]
    };
    const wrapper = shallow(<Movie movie={state.movie} genres={state.genres}/>);
    const actual = wrapper.find('.movie').length;
    expect(actual).to.equal(1);
  });

  it(`should give a 'movie' class and have a title and genres of movie`, () => {
    const state = {
      movie: {title: 'Terminator', vote_average: 7},
      genres :[{id:1, name: 'Action'}]
    };

    const wrapper = shallow(<Movie movie={state.movie} genres={state.genres}/>);
    const title = wrapper.find('.movie h3').text();
    const genres = wrapper.find('.genre').length;
    const rating = wrapper.find('.movie p').text();
    expect(title).to.equal('Terminator');
    expect(genres).to.equal(1);
    expect(rating).to.equal('Rating: 7');
  });

  it(`should render check <Link Component> props`, () => {
    const state = {
      movie: {id: 'ABC', title: 'King Kong', vote_average: 5},
      genres :[{id:1, name: 'Action'}]
    };

    const wrapper = shallow(<Movie movie={state.movie} genres={state.genres}/>);
    const link = wrapper.find('Link');
    const title = wrapper.find('.movie h3').text();
    const genres = wrapper.find('.genre').length;
    const rating = wrapper.find('.movie p').text();
    expect(title).to.equal('King Kong');
    expect(genres).to.equal(1);
    expect(rating).to.equal('Rating: 5');
    //console.log('some', wrapper.debug());
    expect(link.prop('to').pathname).to.equal('/movieDetails/ABC');
  });

});
