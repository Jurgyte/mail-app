import R from 'ramda';
import messageData from './../../../mock/messages_sample.json';

export const REQUEST_EMAILS = 'REQUEST_EMAILS';
export const RECEIVE_EMAILS = 'RECEIVE_EMAILS';
export const REQUEST_READ = 'REQUEST_READ';
export const EMAIL_READ = 'EMAIL_READ';

function requestEmails() {
    return {
        type: REQUEST_EMAILS
    };
}

export function receiveEmails(emails) {

    const extendedEmails = emails.messages.map(
        (item) => ({ ...item, read: false })
    );

    console.log(extendedEmails)

    return {
        type: RECEIVE_EMAILS,
        emails: extendedEmails
    };
}

export function getEmails() {

    return function (dispatch) {

        dispatch(requestEmails());

        return dispatch(receiveEmails(messageData));
    };
}

function requestRead(uid) {

    return {
        type: REQUEST_READ,
        uid
    };
}

export function setReadTrue(uid) {

    return function (dispatch, getState) {

        dispatch(requestRead());
        const state = getState();
        const index = R.findIndex(R.propEq('uid', uid))(state.emails);

        return dispatch({
            type: EMAIL_READ,
            index,
            emails: state.emails
        });
    };
}
