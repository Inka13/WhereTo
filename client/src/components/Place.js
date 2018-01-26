import React, {Component} from 'react';
import {connect} from 'react-redux';
class Place extends Component {
    
    render() {
        const reference = this.props.place.photo;
        const review = this.props.place.review;
        const rating = this.props.place.rating;
        console.log(review);
        return (

            <div className="placebox" onClick={() => this.props.getOne(this.props.place.id)}>
                <div className="images"><img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=120&photoreference="+reference+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM"} alt="bar icon"/></div>
                <div className="titles">{this.props.place.name}</div>
                <div className="placebox-text">
                    <span className="legend"><span>Address: </span>{this.props.place.address}</span>
                    <span className="legend"><span>{review}</span>{this.props.place.address}</span>
                    <span className="legend"><span>{rating}</span>{this.props.place.address}</span>
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(Place);

