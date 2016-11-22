import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import { Button } from 'react-bootstrap';
import MovieModal from '../components/Modal';

describe('<MovieModal />', () => {

  it(`should give a 'movie-modal' class when modal exsists and no video src`, () => {
    const state = {
      close: false,
      videoKey: '',
      showModal: false,
      closeModal: () =>{}
    };

    const wrapper = shallow(<MovieModal showModal={state.showModal} closeModal={state.closeModal} videoKey={state.videoKey}/>);
    const actual = wrapper.find('.movie-modal').length;
    const expectSrc = wrapper.find('iframe').node.props.src;
    expect(actual).to.equal(1);
    expect(expectSrc).to.equal('http://www.youtube.com/embed/?autoplay=1');
  });

  it(`should give a 'movie-modal' class when modal exsists and correct video src`, () => {
    const state = {
      close: false,
      videoKey: 'XYZ',
      showModal: false,
      closeModal: () =>{}
    };

    const wrapper = shallow(<MovieModal showModal={state.showModal} closeModal={state.closeModal} videoKey={state.videoKey}/>);
    const actual = wrapper.find('.movie-modal').length;
    const expectSrc = wrapper.find('iframe').node.props.src;
    expect(actual).to.equal(1);
    expect(expectSrc).to.equal('http://www.youtube.com/embed/XYZ?autoplay=1');
  });

  it(`should handle a click fn when closeModal gets invoked on <Button Component>`, () => {
    const state = {
      close: false,
      videoKey: 'XYZ',
      showModal: false,
      closeModal: sinon.spy()
    };
    const btnWrapper = shallow(<Button onClick={state.closeModal}/>);
    expect(btnWrapper.find('button[type="button"]')).to.be.length(1);
    expect(state.closeModal.calledOnce).to.be.false;
    btnWrapper.find('button[type="button"]').simulate('click');
    expect(state.closeModal.calledOnce).to.be.true;
  });
});
