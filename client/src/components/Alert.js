import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideForm} from '../actions/index';

class Alert extends React.Component {
    
    render() {
        return (
                <div id="alertform" >
                    <div className="formtop">
                    Alert
                        <span className="x" onClick={this.props.hideForm}>X</span>
                    </div>
                    <div className="alert">
                        You need to be logged in order to "GO".
                        Please log in or sign up.
                       
                    </div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        form: state.form,
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Alert);
