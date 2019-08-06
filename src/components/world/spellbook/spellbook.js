import React, { Component } from 'react';
import "./spellbook.css"
import { showModal } from '../../../actions/modalActions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

//import react components
import Table from 'react-bootstrap/Table'


class Spellbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            spellsloaded: false,
            spells: [],
            selection: []
        };
    }

    componentWillMount() {
        console.log("load spells with class Id" + this.props.ClassId)
        this.getSpellData()
    }
    componentDidMount() {
        //Select the first four spells
        
        
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
                    this.setState({selection: [result[0].Id,result[1].Id,result[2].Id,result[3].Id]})
                    this.props.setSelectedSpellsValueFromChild([result[0].Id,result[1].Id,result[2].Id,result[3].Id])
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    selectSpell(SpellId) {
        console.log("Selected spell: " + SpellId)

        if (!this.state.selection.length == 0) {
            var selectionArr = this.state.selection

            if (selectionArr.indexOf(SpellId) > -1) {
                console.log("Already Selected, will remove")
                var index = selectionArr.indexOf(SpellId)
                if (index !== -1) {
                    selectionArr.splice(index, 1);

                    this.setState({ selection: selectionArr });

                    //Update parent component spell selection state
                    this.props.setSelectedSpellsValueFromChild(selectionArr)
                }
            }
            else {
                console.log("Not selected, will add")
                if (this.state.selection.length > 3) {
                    var index = selectionArr.indexOf(selectionArr[0])
                    if (index !== -1) {
                        selectionArr.splice(index, 1);
                        this.setState({ selection: selectionArr });

                        //Update parent component spell selection state
                        this.props.setSelectedSpellsValueFromChild([...this.state.selection, SpellId])
                    }
                }
                this.setState(prevState => ({
                    selection: [...prevState.selection, SpellId]
                }));
                //Update parent component spell selection state
                this.props.setSelectedSpellsValueFromChild([...this.state.selection, SpellId])
            }
        }
        else {
            console.log(this.state.selection.length + " is 0")
            this.setState(prevState => ({
                selection: [...prevState.selection, SpellId]
            }));

            //Update parent component spell selection state
            this.props.setSelectedSpellsValueFromChild(SpellId)
        }
    }

    render() {
        const { error, spells, spellsloaded, selection } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!spellsloaded) {
            return <div>Loading...</div>;
        }
        return (
            <div id="SpellbookTableContainer">
                <i className="far fa-question-circle helperButton" onClick={() => this.props.showModal({
                    open: true,
                    header: 'Spellbook',
                    body: 
                    <div>
                        <div>This table contains your available spells. You may only have four active spells in your loadout.</div>
                    </div>
                    ,
                    buttons: [
                        {
                            title: "Close",
                            action: "hideModal"
                        },
                    ]
                }, 'info')}></i>
                <Table bordered responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Spell</th>
                            <th><i className="fas fa-spinner fa-spin"></i> Cast Time (s)</th>
                            <th><i className="far fa-clock"></i> Cooldown (s) </th>
                            <th><i className="fas fa-tint fa-manaicon"></i> Mana Cost</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody className="SpellbookTableBody">
                        {spells.map(spell => (
                            <tr id={"SpellbookTableRow-" + spell.Id} className={`${selection.includes(spell.Id) == true ? 'SpelbookTableActive' : ''}`} onClick={() => this.selectSpell(spell.Id)} key={spell.Id}>
                                <td><img className="SpellbookIcon" src={require('../../../' + spell.IconPath)}></img> {spell.Name}</td>
                                <td>{spell.CastTime}</td>
                                <td>{spell.Cooldown}</td>
                                <td>{spell.ManaCost}</td>
                                <td>{spell.Description}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>

            </div>
        );
    }

}

const mapStateToProps = state => ({
    showModal: state.showModal,
    loggedincharacter: state.world.loggedincharacter
})

export default connect(mapStateToProps, { showModal })(withRouter(Spellbook))