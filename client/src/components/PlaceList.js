import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getOnePlace} from '../actions/index';
import Menu from './Menu';
import Place from './Place';
class PlacesList extends Component {
    createList() {
        const list = [];
         this.props.places.forEach((poll, i) => {
              list.push(<Place key={i} place={place} getOne={this.props.getOnePlace}/>);
        });
        return list;
    }
    render() {
        if(this.props.places){   
            return (
            <div>
            <Menu/>
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