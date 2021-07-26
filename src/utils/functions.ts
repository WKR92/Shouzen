import { LooseObject } from '../store/interfaces';
import fire from '../utils/fire';

export const getUserFromLocalStorage = () => {
    let storedUser = localStorage.getItem('user');
    let user: LooseObject = {}
    if(storedUser){
        user = JSON.parse(storedUser);
    }
    return user
}

export const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));          
        } else {
            return;
        }
    })
}