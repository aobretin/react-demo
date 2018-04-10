import {observable} from "mobx";
import {observer} from "mobx-react";

let userData = observable({
  logged: false,
  token: '',
  info: {}
})

const setUserData = (key, value) => {
  if (typeof key === 'object') {
    Object.keys(key).forEach(item => userData[item] = key[item]);
    return userData;
  }

  return userData[key] = value;
}

const getUserData = key => key ? userData[key] : userData;

export {
  getUserData,
  setUserData
}
