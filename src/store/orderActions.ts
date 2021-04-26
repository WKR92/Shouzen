import * as actionTypes from './actionTypes';

export const setOrder = (order: object) => {
  return {
    type: actionTypes.SET_ORDER,
    payload: order
  }
};