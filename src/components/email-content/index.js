import React from 'react';
import R from 'ramda';
import moment from 'moment';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';


class EmailContent extends React.Component {

    formatDate = (date) => moment.unix(date).format("LLL");

    render() {

        const {email} = this.props;

        return (
            <div>
                { !R.isEmpty(email) && <Card>
                    <CardTitle
                        title={email.subject}
                        subtitle={`${email.sender} (${this.formatDate(email.time_sent)})`}/>

                    <CardText>{email.message}</CardText>
                </Card>}
            </div>
        );
    }
}

EmailContent.propTypes = {
    email: React.PropTypes.object.isRequired
};

export default EmailContent;
