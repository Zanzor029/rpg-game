import {
    GET_CHARACTERS,
    SET_LOGGED_IN_CHARACTER,
    GET_INVENTORY,
    GET_EQUIPMENT,
    EQUIP_ITEM_FROM_INVENTORY,
    UNEQUIP_ITEM_TO_INVENTORY,
    GET_ENCOUNTER_LOOT,
    SELL_INVENTORY_ITEM,
    SET_ENCOUNTER_CREATURE,
    SET_ENCOUNTER_ID,
    SET_STORE_ITEMS
} from './types'
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

export const sellInventoryItem = (item) => dispatch => {
    console.log("Sell item redux function...")
    console.log(item)
    axios.post(`${global.ApiStartPath}character/sellitem`,
        {
            Item: item,
            Character: store.getState().world.loggedincharacter
        })
        .then(
            res => {
                console.log(res)
                dispatch({
                    type: SELL_INVENTORY_ITEM,
                    payload: item
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

export const getStoreItemsByZone = (zoneId) => dispatch => {
    console.log("Get store items by redux function")
    let storeItemArr = []
    let promises = []
    let getStoreItemIds = async () => {
        await axios.get(`${global.ApiStartPath}storeitemsbyzone/${zoneId}`)
            .then(
                res => {
                    let storeIdArr = res.data
                    let storeItemInfo = async (itemId) => {
                        await axios.get(`${global.ApiStartPath}item/${itemId}`)
                            .then(
                                res => {
                                    console.log(res.data[0])
                                    storeItemArr.push(res.data[0])
                                }
                            )
                    }
                    for (var i = 0; i < storeIdArr.length; i++) {
                        promises.push(storeItemInfo(storeIdArr[i].ItemId))
                    }
                }
            )
    }
    promises.push(getStoreItemIds())

    Promise.all(promises)
        .then(() => {
            console.log(storeItemArr)
            dispatch({
                type: SET_STORE_ITEMS,
                payload: storeItemArr
            })
        })
        .catch((e) => {
            console.error(e)
        })
}

export const getEncounterLoot = (encounterId) => dispatch => {
    console.log("Get encounter loot by redux function...")
    let getItemLootObject = async () => {
        let itemReceived = await axios.get(`${global.ApiStartPath}encounterloot/${encounterId}`)
            .then(
                res => {
                    let lootTable = res.data
                    let lootTableRandom = []
                    for (var i = 0; i < lootTable.length; i++) {
                        let lootItem = Object.assign(lootTable[i])
                        for (var i2 = 0; i2 < lootItem.Chance; i2++) {
                            lootTableRandom.push(lootItem.ItemId)
                        }
                    }
                    function getRandomIntInclusive(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
                    }
                    let randomItemNumber = getRandomIntInclusive(0, lootTableRandom.length)
                    let itemInfo = async () => {
                        let itemInfoObject = await axios.get(`${global.ApiStartPath}item/${lootTableRandom[randomItemNumber]}`)
                            .then(
                                res => {
                                    axios.post(`${global.ApiStartPath}character/additem`, {
                                        CharacterId: store.getState().world.loggedincharacter.Id,
                                        ItemId: lootTableRandom[randomItemNumber]
                                    })
                                        .then(
                                            res => {
                                                console.log(res)
                                            }
                                        )
                                    return res.data[0]

                                }
                            )
                        return itemInfoObject
                    }
                    return itemInfo()
                }
            )
        console.log(itemReceived)
        return itemReceived
    }
    return getItemLootObject()
}

export const setEncounterCreature = (creature) => dispatch => {
    console.log("Set creature redux function...")
    console.log(creature)
    dispatch({
        type: SET_ENCOUNTER_CREATURE,
        payload: creature
    })
}

export const setEncounterId = (id) => dispatch => {
    console.log("Set encounter id redux function...")
    console.log(id)
    dispatch({
        type: SET_ENCOUNTER_ID,
        payload: id
    })
}