import React, { Component } from 'react';
import "../globalcontext";
import "./lorebox.css";
import templogo from "../../resources/images/icons/temp.png"
import test from '../../'

class LoreBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={this.props.LoreBoxClassName} id={this.props.LoreBoxId}>
                <div className="LoreBoxIconContainer">
                    <img className="LoreBoxIcon" src={require('../../' + this.props.LoreBoxIcon)} alt={this.props.LoreBoxIconAltText} />
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