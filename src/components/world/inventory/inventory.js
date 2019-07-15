import React, { Component } from 'react'
import './inventory.css'
import Table from 'react-bootstrap/Table'

class Inventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inventoryitems: [],
            inventoryweapons: [],
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
                    let weapons = []
                    let items = []
                    for(var i = 0; i < result.length;i++) {
                        if(result[i].ItemSlot === "Weapon") {
                            weapons.push(result[i])
                        }
                        else {
                            items.push(result[i])
                        }
                    }
                    this.setState({
                        inventoryweapons: weapons,
                        inventoryitems: items,
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
        console.log("Equip item with ID: "+item.ItemId)
        let equipment = this.state.equipeditems
        equipment[item.ItemSlot] = item
        this.setState({
            equipeditems: equipment
        })

    }

    render() {
        const { error, inventoryloaded, inventoryitems, inventoryweapons,equipeditems } = this.state;
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
                    <Table hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Item Slot</th>
                                <th>Armor</th>
                                <th>Strength</th>
                                <th>Agility</th>
                                <th>Stamina</th>
                                <th>Intellect</th>
                                <th>Spirit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inventoryitems.map(item => (
                            <tr id={"InventoryTablerow-" + item.Id} key={item.Id} onClick={() => this.equipItem(item)}>
                                <td><img className="InventoryIcon" src={require('../../../' + item.IconPath)}></img></td>
                                <td>{item.Name}</td>
                                <td>{item.ItemSlot}</td>
                                <td>{item.Armor}</td>
                                <td>{item.Strength}</td>
                                <td>{item.Agility}</td>
                                <td>{item.Stamina}</td>
                                <td>{item.Intellect}</td>
                                <td>{item.Spirit}</td>
                            </tr>
                        ))}
                        </tbody>

                    </Table>
                    <Table hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Attack Speed</th>
                                <th>Min Damage</th>
                                <th>Max Damage</th>
                                <th>DPS</th>
                                <th>Strength</th>
                                <th>Agility</th>
                                <th>Stamina</th>
                                <th>Intellect</th>
                                <th>Spirit</th>

                            </tr>
                        </thead>
                        <tbody>
                        {inventoryweapons.map(item => (
                            <tr id={"InventoryTablerow-" + item.Id} key={item.Id} onClick={() => this.equipItem(item)}>
                                <td><img className="InventoryIcon" src={require('../../../' + item.IconPath)}></img></td>
                                <td>{item.Name}</td>
                                <th>{item.AttackSpeed}</th>
                                <th>{item.MinValue}</th>
                                <th>{item.MaxValue}</th>
                                <th>{Math.round(((item.MinValue + item.MaxValue) / 2) / item.AttackSpeed)}</th>
                                <td>{item.Strength}</td>
                                <td>{item.Agility}</td>
                                <td>{item.Stamina}</td>
                                <td>{item.Intellect}</td>
                                <td>{item.Spirit}</td>
                            </tr>
                        ))}
                        </tbody>

                    </Table>
                </div>
            )
        }

    }
}

export default Inventory
