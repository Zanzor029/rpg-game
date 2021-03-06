import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Redirect, withRouter} from "react-router-dom";

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
        setTimeout(() => {
          this.props.history.push(targetpath);
        }, 500);
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
                    <SideNav.Nav>
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


                        <NavItem eventKey="/auth/createcharacter">
                            <NavIcon>
                                <i className="fas fa-user-plus"></i>
                            </NavIcon>
                            <NavText>
                                Create Character
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="/auth/logout">
                            <NavIcon>
                                <i className="fas fa-sign-out-alt"></i>
                            </NavIcon>
                            <NavText>
                                Log Out
                            </NavText>
                        </NavItem>

                    </SideNav.Nav>
                </SideNav>
            </div>
        );
    }

}
export default withRouter(Navbar);