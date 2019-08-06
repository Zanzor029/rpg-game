import { GET_CHARACTERS, SET_LOGGED_IN_CHARACTER, GET_INVENTORY, GET_EQUIPMENT, EQUIP_ITEM_FROM_INVENTORY, UNEQUIP_ITEM_TO_INVENTORY, UPDATE_CHARACTER } from './types'
import axios from 'axios'
import store from '../store';

export const getCharacters = () => dispatch => {
    console.log("get characters with redux function...")
    //API Request to get all characters
    axios.get(global.ApiStartPath + "characterstest")
        .then(
            res => dispatch({
                type: GET_CHARACTERS,
                payload: res.data
            })
        )
}

export const setLoggedInCharacter = (character) => dispatch => {
    dispatch({
        type: SET_LOGGED_IN_CHARACTER,
        payload: character
    })
}

export const getInventoryItems = () => dispatch => {
    console.log("Get inventory redux function...")
    let characterId = store.getState().world.loggedincharacter.Id
    axios.get(`${global.ApiStartPath}inventory/${characterId}`)
        .then(
            res => {
                console.log(res.data)
                let inventoryArray = []
                for (var i = 0; i < res.data.length; i++) {
                    console.log(res.data[i])
                    inventoryArray.push(res.data[i])
                }
                console.log(inventoryArray)
                dispatch({
                    type: GET_INVENTORY,
                    payload: inventoryArray
                })
            }
        )
}

export const getEquipment = () => dispatch => {
    console.log("Get equipment redux function...")
    let characterId = store.getState().world.loggedincharacter.Id
    let doGetEquipmentIds = async () => {
        let res = await axios.get(`${global.ApiStartPath}equipment/${characterId}`)
        console.log(res.data)
        delete res.data.Id
        delete res.data.CharacterId
        return res.data
    }

    doGetEquipmentIds().then(
        res => {
            let values = Object.keys(res)
            let inventoryIds = []
            for (var i = 0; i < values.length; i++) {
                let propertyName = values[i]
                if (propertyName.includes("InventoryId") === true) {

                    inventoryIds.push({ Slot: (propertyName), Value: res[propertyName] })
                    delete res[propertyName]
                }
            }
            let keys = Object.keys(res)

            let equipmentArray = []
            let promises = []
            for (var i = 0; i < keys.length; i++) {
                if (res[keys[i]] !== null) {

                    let getItemObject = async (itemId) => {
                        let itemres = await axios.get(`${global.ApiStartPath}item/${itemId}`)
                        return itemres
                    }
                    promises.push(getItemObject(res[keys[i]]).then(
                        res => {
                            res.data[0]["ItemId"] = res.data[0].Id
                            delete res.data[0].Id
                            res.data[0]["CharacterId"] = characterId
                            let itemSlot = res.data[0]["ItemSlot"]
                            let inventoryIdObj = inventoryIds.find(obj => obj.Slot === `${itemSlot}InventoryId`)
                            res.data[0]["Id"] = inventoryIdObj.Value
                            equipmentArray.push(res.data[0])
                        }
                    ))
                }
            }
            Promise.all(promises)
                .then(() => {
                    dispatch({
                        type: GET_EQUIPMENT,
                        payload: equipmentArray
                    })
                })
                .catch((e) => {
                    console.error(e)
                });
        }
    )
}

export const equipItemFromInventory = (item) => dispatch => {
    console.log(`Action called to equip item from inventory`)
    let itemSlot = item.ItemSlot
    let currentEquipment = store.getState().world.equipment
    let itemSlotIsEquipped = currentEquipment.some(equipment => equipment["ItemSlot"] === itemSlot)
    if (itemSlotIsEquipped === false) {
        axios.post(`${global.ApiStartPath}character/equipitem`, item)
        dispatch({
            type: EQUIP_ITEM_FROM_INVENTORY,
            payload: item
        })
    }
    else {
        return (alert(`There is already an item equipped in the ${itemSlot} slot. Remove this item first.`))
    }

}

export const unequipItemToInventory = (item) => dispatch => {
    console.log(`Action called to unequip item to inventory`)
    axios.post(`${global.ApiStartPath}character/unequipitem`, item)
    dispatch({
        type: UNEQUIP_ITEM_TO_INVENTORY,
        payload: item
    })
}