import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPopular} from '../actions/index';

class Menu extends Component {
    
    render() {
        if(this.props.polls){   
            return (
                    <div id="search">
                        <div className="searchopt" onClick={() => this.props.getPopular()}>Bars</div>
                        <div className="searchopt" onClick={() => this.props.getPopular()}>Restaurants</div>
                        {/*<div className="searchopt"><a href="https://www.facebook.com/sharer/sharer.php?u=https://inka13.github.io/Portfolio-official/" target="_blank">
  Share
</a></div> */}
                    </div>
            );
        }
        return (<div></div>);
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getPopular
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        places: state.places
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Menu);