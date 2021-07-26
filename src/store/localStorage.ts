import { LooseObject } from '../store/interfaces';

export const getUserFromLocalStorage = () => {
    let storedUser = localStorage.getItem('user');
    let user: LooseObject = {}
    if(storedUser){
        user = JSON.parse(storedUser);
    }
    return user
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
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