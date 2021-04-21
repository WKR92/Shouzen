import * as actionTypes from './actionTypes';
import {Products, ProductActionInterface} from './interfaces'

export const cartReducer = (state: any = [], action: any) => {
    switch(action.type) {
      case actionTypes.ADD_PRODUCT_TO_CART:
        console.log(state)
        if (state.filter((elem: any)=> elem.name === action.payload.name).length < 1) {
          return [
            ...state,
            Object.assign({}, action.payload)
          ]
        }
        return state
      case actionTypes.REMOVE_PRODUCT_FROM_CART:
        return [
          ...state.filter((elem: any) => elem.name !== action.payload.name)
        ];
      case actionTypes.UPDATE_CART_UNITS:
        const productToChange = state.filter((elem: any) => elem.name === action.payload.productName)
        productToChange[0].amountToOrder = action.payload.amountToOrder
        return [
          ...state
        ]
      default:
        return state;
    }
};

export const userReducer = (state: any = [], action: any) => {
  switch(action.type) {
    case actionTypes.ADD_USER:
      return [
        ...state,
        Object.assign({}, action.payload)
      ]
    default:
      return state;
  } 
};