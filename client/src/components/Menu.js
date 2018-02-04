import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPopular, getAllPlaces} from '../actions/index';

class Menu extends Component {
   
    render() {
         
            return (
                    <div id="search">
                        
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "cafe")}>
                            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png" alt="icon"/>
                        Cafe</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "bar")}>
                        <img src="https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png" alt="icon"/>
                        Bar</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "night_club")}>
                            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png" alt="icon"/>
                        Night Club</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "restaurant")}>
                            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png" alt="icon"/>
                        Restaurant</div>
                        
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "lodging")}>
                            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png" alt="icon"/>
                        Lodging</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "museum")}>
                            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png" alt="icon"/>
                        Museum</div>
                        


                    </div>
            );
        
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getPopular,
        getAllPlaces
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        places: state.places,
        longlat: state.longlat
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Menu);