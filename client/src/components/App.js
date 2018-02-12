import React, { Component } from 'react';
import Header from './Header';
//import Banner from './Banner';
import Menu from './Menu';
import PlacesList from './PlaceList';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';
import Alert from './Alert';
//import allTheCities from 'all-the-cities';
import ActivePlace from './ActivePlace';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPlaces, gotLocation} from '../actions/index';

class App extends Component {
  componentDidMount() {
    if(this.props.longlat.length){
      this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], this.props.placestype);
      
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const lng = position.coords.longitude;
              const lat = position.coords.latitude;
              this.props.gotLocation({lng, lat});
              this.props.getAllPlaces(lng, lat, this.props.placestype);
              
            });
        }
    } 
    
  }
  render() {
    //console.log(this.props.longlat);
      return (
        <div className="app">

          {this.props.form==='signup' ? 
          <div className="formback">
          <SigninForm /></div> : <span/>}
         
          {this.props.form==='login' ? 
          <div className="formback">
           <LoginForm /></div> : <span/>}

           {this.props.form==='alert' ? 
          <div className="formback">
           <Alert /></div> : <span/>}

          <Header />
          <Menu />
          {this.props.activePlace.place_id ? <ActivePlace/> : <PlacesList />}
          {/*this.props.user.name ? <span/> : <Banner />*/}

          

        </div>
      );
  }
}; 
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      getAllPlaces,
      gotLocation
    }, dispatch);
}
function mapStateToProps(state) {
    return {
      form: state.form,
      user: state.user,
      activePlace: state.activePlace,
      places: state.places,
      longlat: state.longlat,
      placestype: state.placestype
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(App);


