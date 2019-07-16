import React, { Component } from 'react'
import ReactDOM from 'react'
import './inventory.css'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

class Inventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inventory: [],
            inventoryloaded: false,
            equipeditems: {
                Head: {},
                Shoulder: {},
                Chest: {},
                Weapon: {},
                Hands: {},
                Legs: {},
                Feet: {}
            },
            itemTooltip: null,
            error: null
        }
    }

    componentWillMount() {
        this.getItemData()
    }

    getItemData() {
        const getItemDataPath = global.ApiStartPath + "inventory/" + this.props.character.Id

        fetch(getItemDataPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "GET",
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        inventory: result,
                        inventoryloaded: true
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    equipItem(item) {
        console.log("Equip item with ID: " + item.ItemId)
        let equipment = this.state.equipeditems
        equipment[item.ItemSlot] = item
        this.setState({
            equipeditems: equipment
        })

    }

    renderTooltip(item) {
        let Tooltipitem = Object.assign({}, item);
        delete Tooltipitem["CharacterId"]
        delete Tooltipitem["ItemId"]
        delete Tooltipitem["IconPath"]
        let keys = Object.keys(Tooltipitem)
        let element = null
        element = (
            <div className="ItemTooltip container">
                {keys.map(key => (
                    <div className="ItemTooltipRow row">
                    <span className="ItemTooltipLabel col-sm">{key}: </span> <span className="ItemTooltipValue col-sm">{Tooltipitem[key]}</span>
                    </div>
                ))}
            </div>)
        this.setState({
            itemTooltip: element
        })
    }
    removeTooltip() {
        this.setState({
            itemTooltip: null
        })
    }

    render() {
        const { error, inventoryloaded, inventory, equipeditems } = this.state;
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
                    Loading...
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Character:</p>
                    <p>Head: {equipeditems.Head.Name}</p>
                    <p>This is the inventory</p>
                    <Table hover responsive size="sm" bordered>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Item Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map(item => (
                                <tr id={"InventoryTablerow-" + item.Id} key={item.Id} onClick={() => this.equipItem(item)} onMouseEnter={() => this.renderTooltip(item)} onMouseLeave={() => this.removeTooltip()}>
                                    <td><img className="InventoryIcon" src={require('../../../' + item.IconPath)}></img></td>
                                    <td>{item.Name}</td>
                                    <td>{item.ItemSlot}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <div Id="ItemTooltipContainer">
                        {this.state.itemTooltip}
                    </div>
                </div>
            )
        }

    }
}

export default Inventory
