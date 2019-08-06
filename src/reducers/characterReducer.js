import { GET_CHARACTERS, SET_LOGGED_IN_CHARACTER, GET_INVENTORY, GET_EQUIPMENT, EQUIP_ITEM_FROM_INVENTORY, UNEQUIP_ITEM_TO_INVENTORY, UPDATE_CHARACTER } from '../actions/types'

const initialState = {
    characters: [],
    loggedincharacter: {},
    userid: 0,
    inventory: [],
    equipment: []
}

export default function (state = initialState, action) {
    
    switch (action.type) {
        case GET_CHARACTERS:
            console.log("action payload below")
            console.log(action.payload)
            return {
                ...state,
                characters: action.payload
            }
        case SET_LOGGED_IN_CHARACTER:
            console.log("Logging in to world with character name:" + action.payload.Name)
            return {
                ...state,
                loggedincharacter: action.payload
            }
        case GET_INVENTORY:
            console.log("Setting inventory in redux store...")
            console.log(action.payload)
            return {
                ...state,
                inventory: action.payload
            }
        case GET_EQUIPMENT:
            console.log("Setting equipment in redux store...")
            console.log(action.payload)
            let copyCurrentLoggedInCharacterGetEq = Object.assign({}, state.loggedincharacter)
            let equipmentStrength = 0
            let equipmentAgility = 0
            let equipmentStamina = 0
            let equipmentIntellect = 0
            let equipmentSpirit = 0
            for (var i = 0; i < action.payload.length; i++) {
                if (action.payload[i].Strength > 0) {
                    equipmentStrength = equipmentStrength + action.payload[i].Strength
                }
                if (action.payload[i].Agility > 0) {
                    equipmentAgility = equipmentAgility + action.payload[i].Agility
                }
                if (action.payload[i].Stamina > 0) {
                    equipmentStamina = equipmentStamina + action.payload[i].Stamina
                }
                if (action.payload[i].Intellect > 0) {
                    equipmentIntellect = equipmentIntellect + action.payload[i].Intellect
                }
                if (action.payload[i].Spirit > 0) {
                    equipmentSpirit = equipmentSpirit + action.payload[i].Spirit
                }
            }
            console.log(equipmentStamina)
            copyCurrentLoggedInCharacterGetEq.Strength = copyCurrentLoggedInCharacterGetEq.Strength + equipmentStrength
            copyCurrentLoggedInCharacterGetEq.Agility = copyCurrentLoggedInCharacterGetEq.Agility + equipmentAgility
            copyCurrentLoggedInCharacterGetEq.Stamina = copyCurrentLoggedInCharacterGetEq.Stamina + equipmentStamina
            copyCurrentLoggedInCharacterGetEq.Intellect = copyCurrentLoggedInCharacterGetEq.Intellect + equipmentIntellect
            copyCurrentLoggedInCharacterGetEq.Spirit = copyCurrentLoggedInCharacterGetEq.Spirit + equipmentSpirit
            console.log(copyCurrentLoggedInCharacterGetEq)
            return {
                ...state,
                equipment: action.payload,
                loggedincharacter: copyCurrentLoggedInCharacterGetEq,
            }
        case EQUIP_ITEM_FROM_INVENTORY:
            console.log("Move item from inventory to equipped items in redux store...")
            console.log(action.payload)
            let copyCurrentLoggedInCharacterEq = Object.assign({}, state.loggedincharacter)
            if (action.payload.Strength > 0) {
                copyCurrentLoggedInCharacterEq.Strength = copyCurrentLoggedInCharacterEq.Strength + action.payload.Strength
            }
            if (action.payload.Agility > 0) {
                copyCurrentLoggedInCharacterEq.Agility = copyCurrentLoggedInCharacterEq.Agility + action.payload.Agility
            }
            if (action.payload.Stamina > 0) {
                copyCurrentLoggedInCharacterEq.Stamina = copyCurrentLoggedInCharacterEq.Stamina + action.payload.Stamina
            }
            if (action.payload.Intellect > 0) {
                copyCurrentLoggedInCharacterEq.Intellect = copyCurrentLoggedInCharacterEq.Intellect + action.payload.Intellect
            }
            if (action.payload.Spirit > 0) {
                copyCurrentLoggedInCharacterEq.Spirit = copyCurrentLoggedInCharacterEq.Spirit + action.payload.Spirit
            }
            return {
                ...state,
                equipment: [...state.equipment, action.payload],
                inventory: state.inventory.filter(item => item !== action.payload),
                loggedincharacter: copyCurrentLoggedInCharacterEq,
            }
        case UNEQUIP_ITEM_TO_INVENTORY:
            console.log("Move item from equipment to inventory in redux store...")
            console.log(action.payload)
            let copyCurrentLoggedInCharacterUnEq = Object.assign({}, state.loggedincharacter)
            if (action.payload.Strength > 0) {
                copyCurrentLoggedInCharacterUnEq.Strength = copyCurrentLoggedInCharacterUnEq.Strength - action.payload.Strength
            }
            if (action.payload.Agility > 0) {
                copyCurrentLoggedInCharacterUnEq.Agility = copyCurrentLoggedInCharacterUnEq.Agility - action.payload.Agility
            }
            if (action.payload.Stamina > 0) {
                copyCurrentLoggedInCharacterUnEq.Stamina = copyCurrentLoggedInCharacterUnEq.Stamina - action.payload.Stamina
            }
            if (action.payload.Intellect > 0) {
                copyCurrentLoggedInCharacterUnEq.Intellect = copyCurrentLoggedInCharacterUnEq.Intellect - action.payload.Intellect
            }
            if (action.payload.Spirit > 0) {
                copyCurrentLoggedInCharacterUnEq.Spirit = copyCurrentLoggedInCharacterUnEq.Spirit - action.payload.Spirit
            }
            return {
                ...state,
                inventory: [...state.inventory, action.payload],
                equipment: state.equipment.filter(item => item !== action.payload),
                loggedincharacter: copyCurrentLoggedInCharacterUnEq
            }
        default:
            return state
    }
}