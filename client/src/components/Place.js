import React, {Component} from 'react';
import {connect} from 'react-redux';

class Place extends Component {
    
    render() {
        const reference = this.props.place.photos ? this.props.place.photos[0]["photo_reference"] : "";
        const rating = this.props.place.rating;
        return (

            <div className="placebox" onClick={() => this.props.getOne(this.props.place.id)}>
                <div className="star">
                    
                    
                    <span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2000px-Star_icon_stylized.svg.png" alt="star"/>
                    </span>
                    <span> {rating}</span>
                    
                    
                </div>
                
                
                <div className="images">
                <div className="cover" />
                <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=120&photoreference="+reference+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM"} alt="bar icon"/></div>
                <div className="placebox-text">
                    <div className="titles">
                        <span>
                            <img src={this.props.place.icon} alt="icon"/>
                        </span>
                        {this.props.place.name}
                    </div>
                    
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

