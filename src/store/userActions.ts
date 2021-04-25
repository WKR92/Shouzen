import * as actionTypes from './actionTypes';
import {UserInfo} from './interfaces';

export const addUserToStore = (user: Object) => {
    return {
      type: actionTypes.ADD_USER,
      payload: user
    }
  };

export const manageUserInfo = (info: UserInfo) => {
  return {
    type: actionTypes.MANAGE_USER_INFO,
    payload: info
  }
};