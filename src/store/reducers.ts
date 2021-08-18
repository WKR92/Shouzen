import * as actionTypes from './actionTypes';
import {Products, 
  UserInfo, 
  UserInfoAction, 
  Order, 
  OrderAction, 
  ChangeUnitsInStoreInterface, 
  LoggedUserInfoAction,
  LooseObject
} from './interfaces'

export const cartReducer = (state: Products[] = [], action: any) => {
    switch(action.type) {
      case actionTypes.ADD_PRODUCT_TO_CART:
        if (state.filter((elem: Products)=> elem.name === action.payload.name).length < 1) {
          return [
            ...state,
            Object.assign({}, action.payload)
          ]
        } else {
          // increase amountToOrder of product that is already in cart
          const productToChange = state.filter((e: Products) => e.id === action.payload.id);
          productToChange[0].amountToOrder++;
          const indexOfProductToChange = state.indexOf(productToChange[0]);
          state[indexOfProductToChange] = productToChange[0];
          return [...state]
        }
      case actionTypes.REMOVE_PRODUCT_FROM_CART:
        return [
          ...state.filter((elem: Products) => elem.name !== action.payload.name)
        ];
      case actionTypes.UPDATE_CART_UNITS:
        const productToChange = state.filter((elem: ChangeUnitsInStoreInterface) => elem.name === action.payload.name)
        productToChange[0].amountToOrder = action.payload.amountToOrder
        return [...state]
      default:
        return state;
    }
};

export const userReducer = (state: UserInfo[] = [], action: UserInfoAction) => {
  switch(action.type) {
    case actionTypes.MANAGE_USER_INFO:
      state = [action.payload]
      return [...state]
    default:
      return state;
  }
};

export const loggedUserReducer = (state: LooseObject = {}, action: LoggedUserInfoAction) => {
  switch(action.type) {
    case actionTypes.GET_LOGGED_USER:
      state = [action.payload]
      return {...state}
    default:
      return {...state};
  }
};


export const orderReducer = (state: Order[] = [], action: OrderAction) => {
  switch(action.type) {
    case actionTypes.SET_ORDER:
      return [
        ...state,
        Object.assign({}, action.payload)
      ]
    default:
      return state;
  }
}