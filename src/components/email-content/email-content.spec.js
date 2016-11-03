import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import EmailContent from './index.js';

const email = {
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
  };


describe("Email Content List", function() {

  it("should render empty element", function() {
    const wrapper = shallow( <EmailContent email={{}} /> );
    expect(wrapper.find('Card').length).to.equal(0);
  });

  it("should render message", function() {
    const wrapper = mount( <EmailContent email={email} /> );
    expect(wrapper.find('Card').length).to.equal(1);
    expect(wrapper.find('h5').text()).to.equal(email.subject);
    expect(wrapper.find('p').first().text()).to.equal('Ernest Hemingway (March 29, 2016 11:24 AM)');
    expect(wrapper.find('p').last().text()).to.equal(email.message);
  });


});