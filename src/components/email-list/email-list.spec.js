import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import EmailList from './index.js';
import emails from './../../redux/reducers/emails';
import { Provider } from 'react-redux';

const messages = [
  {
    uid: "21",
    sender: "Ernest Hemingway",
    subject: "animals",
    message: "This is a tale about nihilism. " +
    "The story is about a combative nuclear " +
    "engineer who hates animals. It starts in a " +
    "ghost town on a world of forbidden magic. " +
    "The story begins with a legal dispute and ends " +
    "with a holiday celebration.",
    time_sent: 1459239867,
    read: false
  },
  {
    uid: "22",
    sender: "Victor Hugo",
    subject: "liberty",
    message: "This is a tale about nihilism. " +
    "The story is about a combative nuclear " +
    "engineer who hates animals. It starts in a " +
    "ghost town on a world of forbidden magic. " +
    "The story begins with a legal dispute and ends " +
    "with a holiday celebration.",
    time_sent: 1459239877,
    read: false
  }
];


describe("Email List", function() {

  const initialState = { emails: messages };

  let store;
  let mockProps;
  let spy;
  let spy1;

  beforeEach(() => {
    store = applyMiddleware(thunk)(createStore)(combineReducers({
      emails,
    }), initialState);

    mockProps = {
      messages,
      setRemove: () => {},
      setEmail: () => {}
    };

    spy = sinon.spy(mockProps, 'setRemove');
    spy1 = sinon.spy(mockProps, 'setEmail');
  });


  it("should render list", function() {
    const wrapper = mount(
      <Provider store={store}>
        <EmailList messages={mockProps.messages}
                   setEmail={mockProps.setEmail}
                   deleteEmail={mockProps.setRemove}  />
      </Provider>);
    expect(wrapper.find('li').length).to.equal(mockProps.messages.length);
    expect(wrapper.find('ListItem').length).to.equal(mockProps.messages.length);
    expect(wrapper.find('IconButton').length).to.equal(mockProps.messages.length);
    expect(wrapper.find('span').at(1).find('span').at(1).text()).to.equal(mockProps.messages[0].subject);
    expect(wrapper.find('span').at(1).find('span').at(2).text()).to.equal('Ernest Hemingway March 29, 2016 11:24 AM');
  });

  it("should invoke read on list item", function() {
    const wrapper = mount(
      <Provider store={store}>
        <EmailList messages={mockProps.messages}
                   setEmail={mockProps.setEmail}  />
      </Provider>);

    wrapper.find('ListItem').first().simulate('click');
    expect(spy1.callCount).to.equal(1);
  });

  it("should invoke function to remove element from the list", function() {
    const wrapper = mount(
      <Provider store={store}>
        <EmailList messages={mockProps.messages}
                   setEmail={mockProps.setEmail}
                   deleteEmail={mockProps.setRemove}  />
      </Provider>);

    expect(wrapper.find('IconButton').length).to.equal(2);
    wrapper.find('IconButton').first().simulate('click');
    expect(spy.callCount).to.equal(1);
  });


});