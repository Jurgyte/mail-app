import React from 'react';
import R from 'ramda';
import moment from 'moment';
import {List, ListItem} from 'react-toolbox/lib/list';
import {IconButton} from 'react-toolbox/lib/button';

import style from './list.scss';


class EmailList extends React.Component {

    formatDate = (date) => moment.unix(date).format("LLL");

    render() {

        return (
            <div>
                { !R.isEmpty(this.props.messages) &&
                <List selectable ripple>
                    {
                        R.map(
                            (mail) => <div key={mail.uid}>
                                <ListItem
                                    className={style.listItem}
                                    caption={mail.subject}
                                    legend={`${mail.sender} ${this.formatDate(mail.time_sent)}`}
                                    rightIcon={ !mail.read ? 'star' : 'star_border' }
                                    onClick={() => this.props.setEmail(mail)}/>
                                <IconButton className={style.delete} icon='close' onClick={() => this.props.deleteEmail(mail.uid)}/>
                            </div>, this.props.messages)
                    }
                </List>
                }
            </div>
        );
    }
}

EmailList.propTypes = {
    messages: React.PropTypes.array.isRequired,
    setEmail: React.PropTypes.func.isRequired,
    deleteEmail: React.PropTypes.func
};

export default EmailList;
