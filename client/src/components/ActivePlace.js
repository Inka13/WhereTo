import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePlace} from '../actions/index';
import Menu from './Menu';
class ActivePlace extends React.Component {

    render() {
        const name = this.props.activePlace.name;
        const rating = this.props.activePlace.rating;
        const reviews = this.props.activePlace.reviews ? this.props.activePlace.reviews.map(review => {
            return <div className="review">{review.text}</div>;
        }) : <span />;
        const photos = this.props.activePlace.photos ? this.props.activePlace.photos.map(photo => {
            return <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=170&photoreference=" + photo["photo_reference"] + "&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM"} alt="bar icon"/>
        }) : <span />;
        const address = this.props.activePlace.address;
        return (
            <div>
                <div className="titles titlesBig">{name}</div>
                <div id="active">
                    
                    <div className="imagesBig">{photos}</div>
                    <div className="star starBig">
                        <span>
                            <img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/star-128.png" alt="star"/>
                        </span>
                        <span> {rating}</span>
                        
                    </div>
                    <div className="map"></div>
                    <div className="legend">{address}</div>
                    <div className="reviews">{reviews}</div>
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
