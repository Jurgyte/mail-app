import React from 'react';
import { connect } from 'react-redux';

import {getEmails, setReadTrue} from '../redux/actions/emails';

import Header from '../components/header';
import EmailList from '../components/email-list';
import EmailContent from '../components/email-content';

import style from './main-page.scss';

const mapStateToProps = (state)=> ({
    emails: state.emails
});

const mapDispatchToProps = (dispatch, ownProps)=>({
    getEmails: () => dispatch(getEmails()),
    setReadTrue: (id) => dispatch(setReadTrue(id))
});

class App extends React.Component {



    state = {
        email: {}
    };


    componentWillMount() {
        this.props.getEmails();
    }

    setEmail = (email) => {
        this.setState({email});
        this.props.setReadTrue(email.uid);
    };


    render() {
        return <div>
            <Header />
            <div className={style.content}>
                <div className={style.sectionLeft}>
                    <EmailList messages={this.props.emails} setEmail={this.setEmail}/>
                </div>
                <div className={style.sectionRight}>
                    <EmailContent email={this.state.email}/>
                </div>
            </div>
        </div>;
    }
}

App.propTypes = {
    emails: React.PropTypes.array.isRequired,
    setReadTrue: React.PropTypes.func,
    getEmails: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
