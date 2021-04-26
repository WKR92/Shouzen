import * as actionTypes from './actionTypes';
import {UserInfo} from './interfaces';

export const manageUserInfo = (info: UserInfo) => {
  return {
    type: actionTypes.MANAGE_USER_INFO,
    payload: info
  }
};