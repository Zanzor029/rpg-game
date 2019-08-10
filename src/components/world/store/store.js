import React, { Component } from 'react'
import "../../globalcontext";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { getStoreItemsByZone } from '../../../actions/worldActions'
import { hideTooltip, showTooltip } from '../../../actions/tooltipActions'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


class Store extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentWillMount() {
        let doGetStoreItemsByZone = async (zoneId) => {
            await this.props.getStoreItemsByZone(zoneId)
        }
        doGetStoreItemsByZone(1)
            .then(
                this.setState({
                    storeloaded: true
                })
            )
    }

    render() {
        if (this.state.storeloaded === false) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Gold Coins: {this.props.loggedincharacter.GoldCoins}</p>
                    <Table variant="dark" responsive size="sm">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Item Slot</th>
                                <th>Buy Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.storeitems.map(item => (
                                <tr key={item.Id}
                                    onMouseOver={(e) => this.props.showTooltip({
                                        object: item,
                                        positionY: e.clientY,
                                        positionX: e.clientX
                                    }, "item")}
                                    onMouseOut={() => this.props.hideTooltip()}
                                >
                                    <td><img className="InventoryIcon" src={require('../../../' + item.IconPath)}></img></td>
                                    <td>{item.Name}</td>
                                    <td>{item.ItemSlot}</td>
                                    <td><Button variant="success" size="sm">Buy Item</Button></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    loggedincharacter: state.world.loggedincharacter,
    storeitems: state.world.storeitems,
    getStoreItemsByZone: getStoreItemsByZone,
    showTooltip: state.showTooltip,
    hideTooltip: state.hideTooltip
})

export default connect(mapStateToProps, { getStoreItemsByZone, showTooltip, hideTooltip })(withRouter(Store))
