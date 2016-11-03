import {receiveEmails, receiveDelete, receiveRead} from '../actions/emails';
import EmailsReducer from './emails';
import {expect} from 'chai';

describe('Email reducer', () => {

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

  it('Should fill state with data', () => {
    const state = EmailsReducer({}, receiveEmails({messages}));
    expect(state).to.eql(messages);
  });

  it('Should set read to TRUE', () => {
    let state = EmailsReducer({}, receiveEmails({messages}));
    state = EmailsReducer(state, receiveRead(state, "22"));
    expect(state[1].read).to.be.true;
  });

  it('Should delete selected record', () => {
    let state = EmailsReducer({}, receiveEmails({messages}));
    state = EmailsReducer(state, receiveDelete("22"));
    expect(state.length).to.equal(1);
  });
});
