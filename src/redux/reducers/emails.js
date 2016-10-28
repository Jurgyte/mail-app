//import update from 'react-addons-update';
import {RECEIVE_EMAILS, EMAIL_READ, EMAIL_DELETED} from '../actions/emails';

import update from 'react/lib/update';

export default (state = [], action)=> {

    switch (action.type) {
        case RECEIVE_EMAILS:
            return action.emails;
        case EMAIL_READ:
            return update(state, {[action.index]:{
            read: {$set: true}
        }});
        case EMAIL_DELETED:
            return update(state, { $splice: [[action.index, 1]] });
        default:
            return state;
    }
}
