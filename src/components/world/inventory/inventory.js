import React, { Component } from 'react'
import './inventory.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { getInventoryItems } from '../../../actions/characterActions'
import { equipItemFromInventory } from '../../../actions/characterActions'
import { showTooltip, hideTooltip } from '../../../actions/tooltipActions'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Loading from '../../loadingscreens/loading';

class Inventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inventoryloaded: false,
            error: null
        }
    }

    componentWillMount() {
        let doGetInventoryItems = async () => {
            let res = await this.props.getInventoryItems()
            return res
        }
        doGetInventoryItems()
            .then(
                this.setState({
                    inventoryloaded: true,
                })
            )
    }

    render() {
        const { error, inventoryloaded } = this.state;
        if (error) {
            return (
                <div>
                    {error.message}
                </div>
            )

        }
        if (inventoryloaded === false) {
            return (
                <div>
                    <Loading />
                </div>
            )
        }
        else {
            return (
                <div>
                    <p><strong>Inventory Items</strong></p>
                    {this.props.reduxinventory.length < 1 && <p>You have no items in your inventory.</p>}
                    {this.props.reduxinventory.length > 0 &&
                    <Table hover responsive size="sm" bordered variant="dark">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Item Slot</th>
                                <th>Equip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.reduxinventory.map(item => (
                                <tr key={item.ItemId} id={"InventoryTablerow-" + item.ItemId}
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
                                    <td><Button variant="success" size="sm" onClick={() => this.props.equipItemFromInventory(item)}> Equip Item</Button></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    }
                </div>
            )
        }

    }
}


const mapStateToProps = state => ({
    getInventoryItems: state.getInventoryItems,
    equipItemFromInventory: state.equipItemFromInventory,
    reduxinventory: state.world.inventory,
    showTooltip: state.showTooltip,
    hideTooltip: state.hideTooltip
})

export default connect(mapStateToProps, { getInventoryItems, equipItemFromInventory, showTooltip, hideTooltip })(withRouter(Inventory))
