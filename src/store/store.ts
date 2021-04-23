import { createStore } from 'redux';
import { combineReducers } from 'redux';
import {cartReducer, userReducer} from './reducers';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash.throttle';

const recuders = combineReducers({
  cartReducer,
  userReducer
})

const persistedState = loadState();
export const store = createStore(
  recuders,
  persistedState
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export type RootState = ReturnType<typeof store.getState>

