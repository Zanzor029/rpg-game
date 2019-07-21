import { LOGIN_ACCOUNT } from './types'
import { REGISTER_ACCOUNT } from './types'
import axios from 'axios'

export const loginAccount = (userData) => dispatch => {
  console.log("login with redux function...")
  //API request to login
  let request = axios
    .post(`${global.ApiStartPath}login`, userData)
    .then(res => {
      dispatch({
        type: LOGIN_ACCOUNT,
        payload: res.data
      })
      localStorage.setItem('token', res.data.token);
      return res
    })
    .catch(err =>{
      return err.response
    })
    return request
}

export const loginAccountWithToken = (jwt) => dispatch => {
  console.log("login with redux function...")
  //Login with existing jwt from local storage
  dispatch({
    type: LOGIN_ACCOUNT,
    payload: jwt
  })
}

export const registerAccount = ((accountData) => dispatch =>{
  console.log("register account with redux function...")
  let request = axios
    .post(`${global.ApiStartPath}register`, accountData)
    .then(res => {
      dispatch({
        type: REGISTER_ACCOUNT,
        payload: res.data
      })
      return res
    })
    .catch(err =>{
      return err.response
    })
    return request
})