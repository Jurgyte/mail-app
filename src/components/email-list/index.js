import React from 'react';
import R from 'ramda';
import moment from 'moment';
import {List, ListItem} from 'react-toolbox/lib/list';
import {IconButton} from 'react-toolbox/lib/button';


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
                                <IconButton icon='delete' onClick={() => this.props.deleteEmail(mail.uid)}/>
                                <ListItem
                                    caption={mail.subject}
                                    legend={`${mail.sender} ${this.formatDate(mail.time_sent)}`}
                                    rightIcon={ !mail.read ? 'star' : 'star_border' }
                                    onClick={() => this.props.setEmail(mail)}/>
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
