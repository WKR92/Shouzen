import {Products} from '../store/storeInterfaces'

const state: Products[] = []

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err)
    }
};

export const saveState = (state: Object) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(err) {
        console.log(err)
    }
};