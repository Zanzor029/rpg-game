import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import history from '../../history';
import "../globalcontext";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './sidenav.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange(targetpath) {
        history.push(targetpath);
    
        window.location.reload()
      }

    render() {
        return (

            <div className="RouterNavigation">
                <SideNav
                    onSelect={(selected) => {
                        console.log(selected);
                        this.routeChange(selected)
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="/">
                            <NavIcon>
                                <i className="fas fa-home"></i>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="/auth/characterlist">
                            <NavIcon>
                                <i className="fas fa-users"></i>
                            </NavIcon>
                            <NavText>
                                Character List
                            </NavText>
                        </NavItem>
                        
                    </SideNav.Nav>
                </SideNav>
            </div>
        );
    }

}
export default Navbar;