import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showSignupForm, showLoginForm, getAllPlaces,
        getCity, getCityLocation,
        userLogout} from '../actions/index';

class Header extends React.Component {
    openmenu = () => {
        this.refs.nav.classList.toggle('activenav');
    }
     submit = (e) => {
        e.preventDefault();
        this.props.getCityLocation(this.refs.city.value);
    }
    render() {
        
        return (
            <header>
                 <div ref="nav" className="nav">  
                    <div className="signin" onClick={this.props.user.name ? () => this.props.userLogout() : () => this.props.showSignupForm()}>{this.props.user.name ? 'Sign Out' : 'Sign In'}</div>
                    <div className="login" onClick={this.props.user.name ? () => {} : () => this.props.showLoginForm()}>{this.props.user.name ? this.props.user.name : 'Log in'}</div>
                </div> 
                <div id="title" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], this.props.placestype)}><span>WhereTo?</span></div>
                <span className="icon" onClick={() => this.openmenu()}>&#9776;</span>
                <form onSubmit={this.submit} id="city-search">
                                <span className="searchopt">City:</span>
                                <input id="search-input" ref="city" type="text" placeholder={this.props.city ? this.props.city : ''}/>
                                <button type="submit" className="searchopt">Search</button>
                        </form>
                <div className="shadow" />
            </header>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showSignupForm,
        showLoginForm,
        getCityLocation,
        getAllPlaces,
        getCity,
        userLogout
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        longlat: state.longlat,
        user: state.user,
        placestype: state.placestype, 
        city: state.city
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Header);