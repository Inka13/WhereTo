import React, {Component} from 'react';
import {connect} from 'react-redux';
class Place extends Component {
    
    render() {
        const voted = this.props.place.voters.indexOf(this.props.user._id);
        return (
            <div className="place-box" onClick={() => this.props.getOne(this.props.place.id)}>
                {voted>-1 ? <span className="votedmark">VOTED</span> : <span/>}
                <div className="titles">{this.props.place.title}</div>
                <div className="pollbox-bottom">
                    <span className="legend"><span>By: </span>{this.props.place.posted_by}</span>
                    <span className="legend votes"><span>Votes: </span>{this.props.place.votes}</span>
                    <span className="legend on"><span>On: </span>{this.props.place.posted_on.slice(0, 10)}</span>

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

