import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPopular, getCityLocation, getAllPlaces} from '../actions/index';

class Menu extends Component {
    submit = (e) => {
        e.preventDefault();
        this.props.getCityLocation(this.refs.city.value);
    }
    render() {
         
            return (
                    <div id="search">
                        <form onSubmit={this.submit}>
                                <span className="searchopt">City:</span>
                                <input id="search-input" ref="city" type="text" required/>
                                <button type="submit">Search</button>
                        </form>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "bar")}>Bars</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "restaurant")}>Restaurants</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "coctail")}>Coctails</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "lodging")}>Lodging</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "wine")}>Wine</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "fast-food")}>Fast food</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "beer")}>Beer</div>
                        <div className="searchopt" onClick={() => this.props.getAllPlaces(this.props.longlat[0], this.props.longlat[1], "hostel")}>Hostel</div>
                    </div>
            );
        
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getPopular,
        getCityLocation,
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