import { GET_ENCOUNTER_LOOT } from './types'

export const getEncounterLoot = (encounter) => dispatch => {
    console.log("Get encounter loot by redux function...")
    dispatch({
        type: GET_ENCOUNTER_LOOT
    });
}