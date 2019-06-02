import React, { Component } from 'react';
import "../globalcontext";
import "./lorebox.css";

class LoreBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="LoreBox" id={this.props.Id}>
                <div className="LoreBoxIconContainer">
                    <img className="LoreBoxIcon" src={this.props.LoreBoxIcon} alt={this.props.LoreBoxIconAltText} />
                </div>
                <div className="LoreBoxTitle">
                    {this.props.LoreBoxTitle}
                </div>
                <div className="LoreBoxText">
                    {this.props.LoreBoxText}
                </div>
            </div>
        );
    }

}
export default LoreBox;