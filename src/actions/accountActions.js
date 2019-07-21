import { LOGIN_ACCOUNT } from './types'
import axios from 'axios'

export const loginAccount = (userData) => dispatch => {
  console.log("login with redux function...")
  //API Request to get all characters
  axios
    .post(`${global.ApiStartPath}login`, userData)
    .then(res => {
      dispatch({
        type: LOGIN_ACCOUNT,
        payload: res.data
      })
      localStorage.setItem('token', res.data.token);
    })
}



// var apipath = global.ApiStartPath + "login"
// fetch(apipath,
//   {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify(userData)
//   })
//   .then(function (res) { return res.json(); })
//   .then(res => {
//     console.log(res);
//     if (res.msg === "ok") {
//       console.log("login successfull")
//       localStorage.setItem('token', res.token);
//       var base64url = res.token.split('.')[1]
//       var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//       }).join(''));
//       var base64json = JSON.parse(base64)
//       this.setState({
//         usertoken: res.token,
//         userid: res.token.split
//       })
//       console.log("Base64: " + base64);
//       console.log("Base64 id: " + base64json.id)
//       this.routeChange("/auth/characterlist")

//     }
//     else {
//       console.log("Bad login")
//       alert("Incorrect credentials!")
//     }

//   })