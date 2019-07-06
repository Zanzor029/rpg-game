import React, { Component } from 'react';
import "./spellbook.css"

//import react components
import Table from 'react-bootstrap/Table'

class Spellbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            spellsloaded: false,
            spells: []
        };
    }

    componentWillMount() {
        console.log("load spells with class Id" + this.props.ClassId)
        this.getSpellData()
    }

    getSpellData() {
        const getSpellDataPath = global.ApiStartPath + "classspells/" + this.props.ClassId
        fetch(getSpellDataPath,
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
                        spellsloaded: true,
                        spells: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    showSpellTooltip(spell) {
        console.log("mouseover")
    }
    render() {
        const { error, spells, spellsloaded } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!spellsloaded) {
            return <div>Loading...</div>;
        }
        return (
            <div id="SpellbookTableContainer">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Spell</th>
                            <th>Cast Time (s)</th>
                            <th>Mana Cost</th>
                            <th>Min Damage</th>
                            <th>Max Damage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spells.map(spell => (
                            <tr>
                                <td>
                                    <div className="SpellbookTooltip">
                                        <span className="SpellbookTooltipText">{spell.Description}</span>
                                    <img className="SpellbookIcon" src={require('../../../' + spell.IconPath)}></img> {spell.Name}
                                    </div>
                                </td>
                                <td>{spell.CastTime}</td>
                                <td>{spell.ManaCost}</td>
                                <td>{spell.MinDamage}</td>
                                <td>{spell.MaxDamage}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>

            </div>
        );
    }

}
export default Spellbook;