import * as actionTypes from './actionTypes';
import {Products, ChangeUnitsInStoreInterface} from './interfaces'

export const addProductToCart = (product: Products) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: product
  }
};

export const removeProductFormCart = (product: Products) => {
  return {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    payload: product
  }
}

export const updateCartUnits = (product: ChangeUnitsInStoreInterface) => {
  return {
    type: actionTypes.UPDATE_CART_UNITS,
    payload: product
  }
}