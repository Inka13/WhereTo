import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePlace} from '../actions/index';
import Menu from './Menu';
class ActivePlace extends React.Component {

    render() {
        const name = this.props.activePlace.name;
        const rating = this.props.activePlace.rating;
        const review = this.props.activePlace.review;
        const address = this.props.activePlace.address;
        const reference = this.props.activePlace.photo;
        return (
            <div>
                <div className="titles titlesBig">{name}</div>
                <div id="active">
                    <div className="star"><span><img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/star-128.png" alt="star"/></span><span>{rating}</span></div>
                    <div className="legend">{address}</div>
                    <div>{review}</div>
                    <div className="images"><img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=120&photoreference="+reference+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM"} alt="bar icon"/></div>
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
