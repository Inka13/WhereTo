import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getOnePlace} from '../actions/index';
//import Menu from './Menu';
import Place from './Place';
class PlacesList extends Component {
    createList() {
        const list = [];
         this.props.places.forEach((place, i) => {
            //console.log(place.review)
              list.push(<Place key={i} place={place} getOne={this.props.getOnePlace}/>);
        });
        return list;
    }
    render() {
        if(this.props.places){   
            return (
            <div>
            
            <div className="clear" />
                <main>
                    
                    {this.createList()}    
                
                </main>
                </div>
            );
        }
        return (<div></div>);
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOnePlace,
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        places: state.places
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(PlacesList);