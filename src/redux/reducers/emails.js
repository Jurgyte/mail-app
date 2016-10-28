//import update from 'react-addons-update';
import {RECEIVE_EMAILS, EMAIL_READ} from '../actions/emails';

import update from 'react/lib/update';

export default (state = [], action)=> {

    switch (action.type) {
        case RECEIVE_EMAILS:
            return action.emails;
        case EMAIL_READ:
            return update(state, {[action.index]:{
            read: {$set: true}
        }});
        default:
            return state;
    }
}
