import R from 'ramda';
import messageData from './../../../mock/messages_sample.json';

export const REQUEST_EMAILS = 'REQUEST_EMAILS';
export const RECEIVE_EMAILS = 'RECEIVE_EMAILS';
export const REQUEST_READ = 'REQUEST_READ';
export const EMAIL_READ = 'EMAIL_READ';
export const REQUEST_DELETE = 'REQUEST_DELETE';
export const EMAIL_DELETED = 'EMAIL_DELETED';

function requestEmails() {
    return {
        type: REQUEST_EMAILS
    };
}

export function receiveEmails(emails) {

    const extendedEmails = emails.messages.map(
        (item) => ({ ...item, read: false })
    );

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

export function receiveRead(emails, uid) {

    const index = R.findIndex(R.propEq('uid', uid))(emails);

    return {
        type: EMAIL_READ,
        index,
        emails
    };
}

export function setReadTrue(uid) {

    return function (dispatch, getState) {

        dispatch(requestRead());
        const state = getState();
        
        return dispatch(receiveRead(state.emails, uid));
    };
}



function requestDelete(uid) {

    return {
        type: REQUEST_DELETE,
        uid
    };
}

export function receiveDelete(emails, uid) {

    const index = R.findIndex(R.propEq('uid', uid))(emails);

    return {
        type: EMAIL_DELETED,
        index,
        emails
    };
}

export function deleteEmails(uid) {

    return function (dispatch, getState) {

        dispatch(requestDelete());
        const state = getState();

        return dispatch(receiveDelete(state.emails, uid));
    };
}

