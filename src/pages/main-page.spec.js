import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import App from './main-page.js';
import emails from './../redux/reducers/emails';
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


describe("Email Page", function() {

  const initialState = { emails: messages };

  let store;
  let mockProps;
  let spy;
  let spy1;
  let spy2;

  beforeEach(() => {
    store = applyMiddleware(thunk)(createStore)(combineReducers({
      emails,
    }), initialState);

    mockProps = {
      messages,
      setReadTrue: () => {},
      getEmails: () => {},
      deleteEmails: () => {}
    };

    spy = sinon.spy(mockProps, 'setReadTrue');
    spy1 = sinon.spy(mockProps, 'getEmails');
    spy2 = sinon.spy(mockProps, 'deleteEmails');
  });


  it("should render page", function() {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>);
    
    expect(wrapper.find('App').length).to.equal(1);
    expect(wrapper.find('Header').length).to.equal(1);
    expect(wrapper.find('EmailList').length).to.equal(1);
    expect(wrapper.find('EmailContent').length).to.equal(1);
  });

});