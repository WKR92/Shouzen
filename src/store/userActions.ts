import * as actionTypes from './actionTypes';

export const addUserToStore = (user: Object) => {
    return {
      type: actionTypes.ADD_USER,
      payload: user
    }
  };