import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePlace} from '../actions/index';
//import Menu from './Menu';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
class ActivePlace extends React.Component {
    


    render() {
        const MyMap = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: this.props.activePlace.lat, lng: this.props.activePlace.lng }}>
                {props.isMarkerShown && <Marker position={{ lat: this.props.activePlace.lat, lng: this.props.activePlace.lng }} />}
            </GoogleMap>
        ));
        const name = this.props.activePlace.name;
        const rating = this.props.activePlace.rating;
        const reviews = this.props.activePlace.reviews ? this.props.activePlace.reviews.map(review => {
            return <div className="review">
                        <div className="review-top">
                            <span><img src={review.profile_photo_url} alt="review author"/></span>
                            <span>{review.author_name}</span>
                            <span><img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/star-128.png" alt="star"/></span>
                            <span>{review.rating}</span>
                        </div>
                        {review.text}
                    </div>;
        }) : <span />;
        const photos = this.props.activePlace.photos ? this.props.activePlace.photos.map(photo => {
            return <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=170&photoreference=" + photo["photo_reference"] + "&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM"} alt="bar icon"/>
        }) : <span />;
        const address = this.props.activePlace.address;
        const phone = this.props.activePlace.phone;
        return (
            <div>
                <div className="titles titlesBig">{name}</div>
                <div id="active">
                    
                    
                    <div id="map">
                        <MyMap
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            />
                    </div>
                    
                    <div className="place-details">
                        <div className="star starBig">
                            <span>
                                <img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/star-128.png" alt="star"/>
                            </span>
                            <span> {rating}</span>
                        </div>
                        <div className="legend">{address}</div>
                        <div className="legend">{phone}</div>
                    </div>
                    <div className="reviews">{reviews}</div>
                    <div className="imagesBig">{photos}</div>
                    <div className="clear" />
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
export default connect(mapStateToProps, matchDispatchToProps)(ActivePlace);
