import { createStore } from 'redux';
import {reducer} from './reducer'
import {loadState, saveState} from '../Components/localStorage'


const persistedState = loadState();
export const store = createStore(
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
})
