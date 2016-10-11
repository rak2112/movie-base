import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import MovieList from '../components/MovieList';

describe('<MovieList />', () => {

  it(`should find the genres related to movie id: `, () => {
    const state = {
      genre: [{id: 4, name: 'action'}, {id: 5, name: 'thriller'}, {id: 6, name: 'fantasy'} ],
      data: [{id: 4, genre_ids: [1,4,6]}]
    };
    const wrapper = shallow(<MovieList {...state}/>);
    const movie = wrapper.find('Movie');
    expect(movie.prop('movie').id).to.equal(4);
    expect(movie.prop('genres').length).to.equal(2);
    expect(movie.prop('genres')[0].name).to.equal('action');
    expect(movie.prop('genres')[1].name).to.equal('fantasy');
  });
});
