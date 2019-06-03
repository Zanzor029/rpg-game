import React, { Component } from 'react';
import "../globalcontext";
import "./createcharacter.css";
import ReactDOM from "react-dom";
import RaceListEntry from './racelistentry';

class GenderSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Highlighted: "No"
        };
    }
    setGender(event) {
        console.log(event.target.value);
        //Add function to update Race icons to female
        if (document.querySelector('.genderInput:checked').value === "Male") {
            console.log("Update to Male");
            var racelistentries = document.getElementsByClassName("racelistentry");
            var raceidarr = [];
            for (let i = 0; i < racelistentries.length; i++) {
                var obj = {
                    Id: racelistentries[i].id,
                    AltText: document.getElementById(racelistentries[i].id+"-img").alt
                }
                raceidarr.push(obj);
                console.log(obj);
            }
            for (let i = 0; i < raceidarr.length; i++) {
                console.log(raceidarr[i])
                ReactDOM.render(
                    <RaceListEntry
                        RaceListEntryImgPath={require("../../resources/images/icons/races/male/" + raceidarr[i].AltText + ".png")}
                        RaceListEntryImgText={raceidarr[i].AltText}
                        RaceListEntryId={raceidarr[i].Id}
                    />, document.getElementById(raceidarr[i].Id)
                )
            }
        }
        else if (document.querySelector('.genderInput:checked').value === "Female") {
            console.log("Update to Female");
            var racelistentries = document.getElementsByClassName("racelistentry");
            var raceidarr = [];
            for (let i = 0; i < racelistentries.length; i++) {
                var obj = {
                    Id: racelistentries[i].id,
                    AltText: document.getElementById(racelistentries[i].id+"-img").alt
                }
                raceidarr.push(obj);
                console.log(obj);
            }
            for (let i = 0; i < raceidarr.length; i++) {
                console.log(raceidarr[i])
                ReactDOM.render(
                    <RaceListEntry
                        RaceListEntryImgPath={require("../../resources/images/icons/races/female/" + raceidarr[i].AltText + ".png")}
                        RaceListEntryImgText={raceidarr[i].AltText}
                        RaceListEntryId={raceidarr[i].Id}
                    />, document.getElementById(raceidarr[i].Id)
                )
            }
        };


    }

    render() {
        return (
            <div id="characterGenderInputHolder" onChange={this.setGender.bind(this)}>
                <p>Gender</p>
                <input type="radio" name="gender" className="genderInput" id="characterGenderInputMale" value="Male" defaultChecked />Male
                <input type="radio" name="gender" id="characterGenderInputFemale" className="genderInput" value="Female" />Female
          </div>
        )
    }

}
export default GenderSelection;