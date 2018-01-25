import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {submitSignup, hideForm} from '../actions/index';
class SigninForm extends React.Component {

    submit = (e) => {
    e.preventDefault();
    this.props.submitSignup(this.refs.name.value, this.refs.email.value, this.refs.password.value);
    }
    
    render() {
        return (
                <form id="signinform" onSubmit={this.submit}>
                    <div className="formtop">
                        Sign Up
                        <span className="x" onClick={this.props.hideForm}>X</span>
                    </div>
                    <div className="form">
                        <div className="inputopts">E-mail:</div>
                        <input ref="email" type="email" required/>
                    </div>
                    <div className="form">
                        <div className="inputopts">Name:</div>
                        <input ref="name" type="text" required/>
                    </div>
                    <div className="form">
                        <div className="inputopts">Password:</div>
                        <input ref="password" type="password" required/>
                    </div>
                    <div className="submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submitSignup,
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        form: state.form,
        messages: state.messages
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(SigninForm);
