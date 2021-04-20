import * as actionTypes from './actionTypes';
import {Products, ProductActionInterface} from '../store/storeInterfaces'

export const reducer = (state: any, action: any) => {
    switch(action.type) {
      case actionTypes.ADD_PRODUCT_TO_CART:
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
        console.log(action.payload)
        console.log(productToChange)

        productToChange[0].amountToOrder = action.payload.amountToOrder
        console.log(state)
        return [
          ...state
        ]
      default:
        return state;
    } 
};