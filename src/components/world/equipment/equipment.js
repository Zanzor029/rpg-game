import React, { Component } from 'react'
import './equipment.css'
import { connect } from 'react-redux'
import { getEquipment, unequipItemToInventory } from '../../../actions/worldActions'
import { showModal } from '../../../actions/modalActions'
import { showTooltip, hideTooltip } from '../../../actions/tooltipActions'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Loading from '../../loadingscreens/loading';

class Equipment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            equipmentloaded: false
        }
    }
    componentWillMount() {
        let doGetEquipment = async () => {
            let res = await this.props.getEquipment()
            return res
        }
        doGetEquipment()
            .then(() => {
                this.setState({
                    equipmentloaded: true,
                })
            }
            )
    }

    render() {

        if (this.state.equipmentloaded === false) {
            return (
                <Loading />
            )
        }
        else if (!this.props.reduxequipment) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div>
                    <i className="far fa-question-circle helperButton" onClick={() => this.props.showModal({
                        open: true,
                        header: 'Character Stats',
                        body:
                            <div>
                                <div>This panel displays your characters equipped items and inventory.</div>
                                <div>You can only equip one item per item slot.</div>
                            </div>
                        ,
                        buttons: [
                            {
                                title: "Close",
                                action: "hideModal"
                            },
                        ]
                    }, 'info')}></i>
                    <p><strong>Equipped Items</strong></p>
                    {this.props.reduxequipment.length < 1 && <p>You have no items equipped.</p>}
                    {this.props.reduxequipment.length > 0 &&
                        <Table hover responsive size="sm" bordered variant="dark">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Item Slot</th>
                                    <th>Unequip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.reduxequipment.map(item => (
                                    <tr id={"InventoryTablerow-" + item.ItemId}
                                        key={item.ItemId}
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
                                        <td><Button variant="success" size="sm" onClick={() => this.props.unequipItemToInventory(item)}>Unequip Item</Button></td>
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
    getEquipment: state.getEquipment,
    unequipItemToInventory: state.unequipItemToInventory,
    reduxequipment: state.world.equipment,
    showModal: state.showModal,
    showTooltip: state.showTooltip,
    hideTooltip: state.hideTooltip
})

export default connect(mapStateToProps, { getEquipment, unequipItemToInventory, showModal, showTooltip, hideTooltip })(withRouter(Equipment))