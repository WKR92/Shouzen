export interface Products {
    name: string,
    id: string,
    price: number,
    picture: string,
    amount: number,
    amountToOrder: number,
    headline: string,
    description: string,
    callToAction: string
}

export interface PropsFromStateForBoots {
    getProduct: Function,
}

export interface PropsFromStateForCart {
    removeProduct: Function,
    listOfProductsInCart: Products[],
    changeAmountToOrder: Function
}

export interface ChangeUnitsInStoreInterface {
    name: string,
    amountToOrder: number
}

export interface ProductActionInterface {
    type: string,
    payload: Products | ChangeUnitsInStoreInterface
}

export interface PropsPassedToLogin {
    email: string;
    setEmail: Function;
    password: string;
    setPassword: Function;
    handleLogin: Function;
    handleSignUp: Function;
    hasAccount: boolean;
    setHasAccount: Function;
    emailError: string;
    passwordError: string;
}

