import React, { Component } from 'react';
import Header from './Header';
//import Banner from './Banner';
import PlacesList from './PlaceList';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';

import ActivePlace from './ActivePlace';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPlaces} from '../actions/index';

class App extends Component {
  componentDidMount() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat =  position.coords.latitude;
        this.props.getAllPlaces(long, lat);
        console.log(long, lat);
        });
    } 
    
  }
  render() {
      return (
        <div className="app">

          {this.props.form==='signup' ? 
          <div className="formback">
          <SigninForm /></div> : <span/>}
         
          {this.props.form==='login' ? 
          <div className="formback">
           <LoginForm /></div> : <span/>}

          <Header />
          
          {this.props.activePlace.id ? <ActivePlace/> : <PlacesList />}
          {/*this.props.user.name ? <span/> : <Banner />*/}

          

        </div>
      );
  }
}; 
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      getAllPlaces
    }, dispatch);
}
function mapStateToProps(state) {
    return {
      form: state.form,
      user: state.user,
      activePlace: state.activePlace,
      places: state.places
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(App);


