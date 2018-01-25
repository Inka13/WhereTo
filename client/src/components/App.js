import React, { Component } from 'react';
import Header from './Header';
//import Banner from './Banner';
import PlacesList from './PlacesList';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import ActivePlace from './ActivePlace';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPlaces} from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.getAllPlaces();
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

           {this.props.form==='create' ? 
          <div className="formback">
           <CreateForm /></div> : <span/>}

           {this.props.form==='alert' ? 
          <div className="formback">
           <Alert /></div> : <span/>}

          <Header />
          {this.props.activePlace.id ? <ActivePlace/> : <PlacesList />}
          {/*this.props.user.name ? <span/> : <Banner />*/}

          

        </div>
      );
  }
}; 
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      getAllPlaces,
      getIP
    }, dispatch);
}
function mapStateToProps(state) {
    return {
      form: state.form,
      user: state.user,
      activePlace: state.activePlace
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(App);


