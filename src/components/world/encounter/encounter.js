import React, { Component } from 'react';
import "./encounter.css"
import history from '../../../history';
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'

class Encounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatureloaded: false,
            creature: [],
            characterspells: [],
            charactercastpercentage: 0,
            charactercastinprogress: false,
            combatlog: "Combat started!"
        }
        this.CombatLogRef = React.createRef();
    }

    componentWillMount() {
        //crate event listner for keydown
        document.addEventListener("keydown", this.handleKeyDown.bind(this))
        //check if we actually have what we need (coming from World and not typing /auth/encounter directly)
        if (!this.props.location.state) {
            this.routeChange("/auth/characterlist")
        }

        //Calculate additional character data
        let characterdata = this.props.location.state.character
        //Stamina --> Health (Same for all classes)
        characterdata.Health = characterdata.Stamina * 10
        characterdata.MaxHealth = characterdata.Stamina * 10
        characterdata.Shield = 0

        //Intellect --> Mana (Same for all classes)
        characterdata.Mana = characterdata.Intellect * 15
        characterdata.MaxMana = characterdata.Intellect * 15

        //Strength
        if (characterdata.ClassId == 1 || characterdata.ClassId == 9 || characterdata.ClassId == 5 || characterdata.ClassId == 3) {
            characterdata.AttackPower = characterdata.Strength * 2
        }
        else {
            characterdata.AttackPower = characterdata.Strength * 1
        }

        //Agility
        if (characterdata.ClassId == 6 || characterdata.ClassId == 8) {
            characterdata.AttackPower = characterdata.AttackPower + characterdata.Agility
        }

        this.setState({
            selectedencounterid: this.props.location.state.selectedencounterid,
            selectedcreatureid: this.props.location.state.selectedcreatureid,
            character: characterdata,
            selectedspells: this.props.location.state.selectedspells,
            savestate: this.props.location.state.savestate
        })
        this.getCreatureData()
        this.getSpellData()
    }
    componentDidMount() {
        this.regenCharacterManaInterval = setInterval(() => this.regenCharacterMana(), 5000);
        this.creatureAutoAttackInterval = setInterval(() => this.creatureAutoAttack(), 2000);
    }

    componentDidUpdate() {

        // Check if creature or character is dead
        if (this.state.creature.Health <= 0) {
            clearInterval(this.regenCharacterManaInterval)
            clearInterval(this.creatureAutoAttack)
            clearInterval(this.characterCastProgress)
            this.routeChange("/auth/encounterend", {combatresult: "CharacterWon"})

        }
        if (this.state.character.Health <= 0) {
            clearInterval(this.regenCharacterManaInterval)
            clearInterval(this.creatureAutoAttack)
            clearInterval(this.characterCastProgress)
            this.routeChange("/auth/encounterend",{combatresult: "CharacterLost"})
        }
    }

    componentWillUnmount() {
        clearInterval(this.regenCharacterManaInterval)
        clearInterval(this.creatureAutoAttack)
        clearInterval(this.characterCastProgress)
    }

    handleKeyDown(e) {

        // If Key = 1
        if (e.which == 49) {
            this.castSpell(this.state.characterspells[0])
        }
        // If Key = 2
        if (e.which == 50) {
            this.castSpell(this.state.characterspells[1])
        }
        // If Key = 3
        if (e.which == 51) {
            this.castSpell(this.state.characterspells[2])
        }
        // If Key = 4
        if (e.which == 52) {
            this.castSpell(this.state.characterspells[3])
        }
    }

    getSpellData() {
        const selectedspells = this.props.location.state.selectedspells
        for (var i = 0; i < selectedspells.length; i++) {
            console.log(selectedspells[i])
            const getSpellDataPath = global.ApiStartPath + "spell/" + selectedspells[i]
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
                        result[0].LastCastTime = Date()
                        result[0].OnCooldown = false
                        this.setState({ characterspells: [...this.state.characterspells, result[0]] })
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
    }

    getCreatureData() {
        const getCreatureDataPath = global.ApiStartPath + "creature/" + this.props.location.state.selectedcreatureid
        fetch(getCreatureDataPath,
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
                    result[0].MaxHealth = result[0].Health
                    result[0].MaxMana = result[0].Mana
                    this.setState({
                        creatureloaded: true,
                        creature: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        creatureloaded: false,
                        error
                    });
                }
            )
    }

    routeChange(targetpath, state) {
        history.push(targetpath, state);
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }

    damageCharacter(amount) {
        let prevHealth = this.state.character.Health
        let prevShield = this.state.character.Shield
        console.log("Damage Character for " + amount)
        this.appendCombatLog(this.state.creature.Name + " hits you for " + amount + ".")
        //Check if character is shielded
        if (prevShield > 0) {
            //Shield not entirely broken
            if (prevShield - amount > 0) {
                this.setState(prevState => ({
                    character: {
                        ...prevState.character,
                        Shield: (prevShield - amount)
                    }
                }))
            }
            //Shield broken
            else {
                this.setState(prevState => ({
                    character: {
                        ...prevState.character,
                        Shield: 0,
                        Health: (prevHealth - amount + prevShield)
                    }
                }))
            }
        }
        //Character is not shielded
        else {
            this.setState(prevState => ({
                character: {
                    ...prevState.character,
                    Health: (prevHealth - amount)
                }
            }))
        }

    }

    castSpell(spell) {
        console.log("Casting spell with ID: " + spell.Id)

        //Check cooldown
        let index = this.state.characterspells.indexOf(spell)
        console.log("Index of spell is: " + index)
        if (this.state.characterspells[index].OnCooldown == true) {
            console.log("Spell on cooldown")
            return
        }
        else {

        }

        //Handle Mana Cost
        if (this.state.character.Mana < spell.ManaCost) {
            console.log("Not enough Mana")
            return
        }
        else {
            //Being Casting
            console.log("Begin Cast")
            this.setState({ charactercastinprogress: true })
            this.setState({ charactercastlabel: "Casting " + spell.Name })
            let castTimeMs = spell.CastTime * 1000
            this.characterCastProgressInterval = setInterval(() => this.characterCastProgress(castTimeMs), 100);

            const cast = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms))
            }
            cast(castTimeMs).then(() => {
                console.log("Cast complete")
                clearInterval(this.characterCastProgressInterval)
                this.setState({ charactercastinprogress: false })
                this.setState({ charactercastpercentage: 0 })
                this.setState({ charactercastlabel: "" })

                //Set Cooldown
                let now = Date()
                let characterspellscopy = JSON.parse(JSON.stringify(this.state.characterspells))
                characterspellscopy[index].LastCastTime = now
                characterspellscopy[index].OnCooldown = true
                this.setState({
                    characterspells: characterspellscopy
                })
                const cooldown = (ms) => {
                    console.log("Setting cooldown for spell with index: " + index + " to " + ms + " ms.")
                    if (ms > 0) {
                        this.appendCombatLog("Your " + spell.Name + " is now on cooldown for " + ms / 1000 + " seconds.")
                    }

                    return new Promise(resolve => setTimeout(resolve, ms))
                }
                cooldown(spell.Cooldown * 1000).then(() => {
                    console.log("Cooldown for spell with index: " + index + " cleared")
                    if (spell.Cooldown > 0) {
                        this.appendCombatLog("Your " + spell.Name + " is no longer on cooldown.")
                    }

                    let characterspellscopy = JSON.parse(JSON.stringify(this.state.characterspells))
                    characterspellscopy[index].OnCooldown = false
                    this.setState({
                        characterspells: characterspellscopy
                    })
                })


                //Handle mana
                let prevMana = this.state.character.Mana
                this.setState(prevState => ({
                    character: {
                        ...prevState.character,
                        Mana: (prevMana - spell.ManaCost)
                    }
                }))

                //Amount is always the same for each type at the moment. base on random avg value and scale with spell coefficient if it is not a physical spell. If it is physical it will scale with weapon dmg and AP
                var baseamount = Math.round(Math.random() * (spell.MaxValue - spell.MinValue) + spell.MinValue);

                if (spell.MagicSchool !== "Physical") {
                    var amount = Math.round(baseamount * (1 + spell.SpellCoefficient))
                }
                else {
                    //add scaling with weapon damage later, scales with attackpower only for now
                    var amount = Math.round(baseamount + (this.state.character.AttackPower / 10))
                }
                //Loop spelltypes
                const spelltypes = spell.Type.split(",")
                for (var i = 0; i < spelltypes.length; i++) {

                    console.log("Handle spelltype: " + spelltypes[i])
                    //Handle DamageCreature
                    if (spelltypes[i] == "DamageCreature") {
                        console.log("Damage Creature for " + amount)
                        this.appendCombatLog("Your " + spell.Name + " hits " + this.state.creature.Name + " for " + amount + ".")
                        let prevHealth = this.state.creature.Health
                        this.setState(prevState => ({
                            creature: {
                                ...prevState.creature,
                                Health: (prevHealth - amount)
                            }
                        }))
                    }
                    //Handle ShieldCharacter
                    if (spelltypes[i] == "ShieldCharacter") {
                        console.log("Shield Character for " + amount)
                        this.appendCombatLog("Your " + spell.Name + " shields you for " + amount + ".")
                        let prevShield = this.state.character.Shield
                        this.setState(prevState => ({
                            character: {
                                ...prevState.character,
                                Shield: (prevShield + amount)
                            }
                        }))
                    }
                    //Handle HealCharacter
                    if (spelltypes[i] == "HealCharacter") {
                        console.log("Heal Character for " + amount)
                        this.appendCombatLog("Your " + spell.Name + " heals you for " + amount + ".")
                        let prevHealth = this.state.character.Health
                        let MaxHealth = this.state.character.MaxHealth
                        if (prevHealth + amount > MaxHealth) {
                            this.setState(prevState => ({
                                character: {
                                    ...prevState.character,
                                    Health: MaxHealth
                                }
                            }))
                        }
                        else {
                            this.setState(prevState => ({
                                character: {
                                    ...prevState.character,
                                    Health: (prevHealth + amount)
                                }
                            }))
                        }
                    }
                }
            })


        }
    }

    appendCombatLog(input) {
        this.setState({
            combatlog: this.state.combatlog + "\n" + input
        });
        //Scroll to bottom of CombatLog
        this.CombatLogRef.current.scrollTop = this.CombatLogRef.current.scrollHeight;
    }

    //Intervalls
    creatureAutoAttack() {
        let amount = Math.round(Math.random() * (this.state.creature.MaxDamage - this.state.creature.MinDamage) + this.state.creature.MaxDamage);
        this.damageCharacter(amount)
    }
    characterCastProgress(castTimeMs) {
        // let tickAmount = 20
        let tickAmount = 20 / (castTimeMs / 1000)
        let prevCastPercentage = this.state.charactercastpercentage
        this.setState({ charactercastpercentage: prevCastPercentage + tickAmount })
    }
    regenCharacterMana() {
        if (this.state.character.Mana < this.state.character.MaxMana) {
            let regenAmount = Math.round(5 + (this.state.character.Spirit / 5))
            console.log("Character Regen " + regenAmount + " Mana")
            this.appendCombatLog("You gain " + regenAmount + " mana from Sprit Regeneration.")
            let prevMana = this.state.character.Mana
            let maxMana = this.state.character.MaxMana
            if (prevMana + regenAmount < maxMana) {
                this.setState(prevState => ({
                    character: {
                        ...prevState.character,
                        Mana: (prevMana + regenAmount)
                    }
                }))
            }
            else {
                this.setState(prevState => ({
                    character: {
                        ...prevState.character,
                        Mana: maxMana
                    }
                }))
            }
        }
    }


    render() {
        const { error, creature, character, creatureloaded, characterspells } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!creatureloaded) {
            return <div>Loading...</div>;
        }
        return (
            <div id="EncounterContainer">

                    <div id="EncounterSecondaryContainer">
                        <div id="EncounterUnitFramesContainer">
                            <div id="EncounterPlayerUnitFrameContainer">
                                <div id="EncounterCharacterPanel">
                                    <div id="EncounterCharacterName">
                                        {character.Name}
                                    </div>
                                    <div id="EncounterCharacterTopBar">
                                        <div id="EncounterCharacterRaceIconHolder">
                                            <img id="EncounterCharacterRaceIcon" src={require('../../../' + character.RaceIconPath)} />
                                        </div>
                                        <div id="EncounterCharacterHealthBar">
                                            <span id="EncounterCharacterHealthValue" class="EncounterHealthManaText">{character.Health} / {character.MaxHealth} (+{character.Shield})</span>
                                        </div>
                                    </div>
                                    <div id="EncounterCharacterBottomBar">
                                        <div id="EncounterCharacterClassIconHolder">
                                            <img id="EncounterCharacterClassIcon" src={require('../../../' + character.ClassIconPath)} />
                                        </div>
                                        <div id="EncounterCharacterManaBar">
                                            <span id="EncounterCharacterManaValue" class="EncounterHealthManaText">{character.Mana} / {character.MaxMana}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="EncounterCreatureUnitFrameContainer">
                                <div id="EncounterCreaturePanel">
                                    <div id="EncounterCreatureName">
                                        {creature.Name}
                                    </div>
                                    <div id="EncounterCreatureTopBar">
                                        <div id="EncounterCreatureIconHolder">
                                            <img id="EncounterCreatureIcon" src={require('../../../' + creature.IconPath)} />
                                        </div>
                                        <div id="EncounterCreatureHealthBar">
                                            <span id="EncounterCreatureHealthValue" class="EncounterHealthManaText">{creature.Health} / {creature.MaxHealth}</span>
                                        </div>
                                    </div>
                                    <div id="EncounterCreatureBottomBar">
                                        <div id="EncounterCreatureClassIconHolder">
                                            <img id="EncounterCreatureClassIcon" />
                                        </div>
                                        <div id="EncounterCreatureManaBar">
                                            <span id="EncounterCreatureManaValue" class="EncounterHealthManaText">{creature.Mana} / {creature.MaxMana}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="EncounterCharacterActionBar">
                            <div id="EncounterCharacterCastBar">
                                <ProgressBar animated now={this.state.charactercastpercentage} label={this.state.charactercastlabel} />
                            </div>
                            <div id="EncounterCharacterSpellBarContainer">
                                <Table size="sm" hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Keybind</th>
                                            <th>Spell</th>
                                            <th>Cast Time (s)</th>
                                            <th>Cooldown (s)</th>
                                            <th>Mana Cost</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${this.state.charactercastinprogress == true ? 'CastInPogress' : ''}`}>
                                        {characterspells.map(spell => (
                                            <tr className={`${this.state.characterspells[characterspells.indexOf(spell)].OnCooldown == true ? 'SpellOnCooldown' : ''}`} id={"SpellbookTableRow-" + spell.Id} onClick={() => this.castSpell(spell)} key={spell.Id}>
                                                <td>{characterspells.indexOf(spell) + 1}</td>
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
                        </div>
                    </div>
                    <div id="EncounterMainPanelContainer">
                    <div id="EncounterCombatLogContainer">
                        <p>Combat Log:</p>
                        <textarea readonly="readonly" ref={this.CombatLogRef} id="EncounterCombatLog" value={this.state.combatlog} />

                    </div>
                </div>
            </div>
        );
    }

}
export default Encounter;