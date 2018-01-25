import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePlace} from '../actions/index';
import Menu from './Menu';
class ActivePlace extends React.Component {
    constructor() {
        super();
        this.selected = '';
    }
    
   submit = (e) => {
        e.preventDefault();
        
    }
    

    render() {
        
        return (
                <div>
                <Menu/>
                <div id="active">
                    
                </div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        
        updatePlace
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        activePlace: state.activePlace,
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(ActivePoll);
