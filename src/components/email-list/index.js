import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { List, ListItem } from 'react-toolbox/lib/list';


class EmailList extends React.Component {

    formatDate = (date) => moment.unix(date).format("LLL");

    render(){

        return (
        <div>
            { !R.isEmpty(this.props.messages) &&
            <List selectable ripple>
                {
                    R.map(
                        (mail) => <ListItem
                            key={mail.uid}
                            caption={mail.subject}
                            legend={`${mail.sender} ${this.formatDate(mail.time_sent)}`}
                            rightIcon={ !mail.read ? 'star' : 'star_border' }
                            onClick={() => this.props.setEmail(mail)}/>
                    ,this.props.messages)
                }
            </List>
            }
        </div>
        );
    }
}

EmailList.propTypes = {
    messages: React.PropTypes.array.isRequired,
    setEmail: React.PropTypes.func.isRequired
};

export default EmailList;
