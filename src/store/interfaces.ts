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

export interface PropsForLinks {
    listOfProductsInCart?: Products[],
    activateToggle: Function;
}

export interface ChangeUnitsInStoreInterface {
    name: string,
    amountToOrder: number
}

export interface ProductActionInterface {
    type: string,
    payload: Products
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

export interface UserInfo {
    name: string,
    surname: string,
    address: string,
    postCode: string,
    town: string,
    country: string,
    telephone: string
}

export interface UserInfoAction {
    type: string,
    payload: UserInfo
}

export interface PaymentProps {
    setShowModal: Function,
    total: number,
    listOfProductsInCart: Products[],
    userInfo: UserInfo[],
    setOrder: Function,
    setShowPaymentForm: Function
}

export interface Order {
    id: string,
    whatIsOrdered: [string, number][],
    whoIsOrdering: UserInfo,
    costOfOrder:  number
}

export interface OrderAction {
    type: string,
    payload: Order
}

export interface UserInfoTableProps {
    setShowPaymentForm: Function,
    userInfo: UserInfo[],
    getUserInfo: Function,
    setShowUserInfoTable: Function
}

export interface RemoveProductAction {
    type: string,
    payload: Products
}

export interface LoginModalProps {
    setShowLoginModal: Function
}

export interface UserProfile {
    id: string,
    information: Object,
    user: string
}

export interface UserSnap {
    information: {
        name: string
        surname: string,
        town: string,
        country: string
        phone: string,
        postCode: string,
        address: string
    },
    user: string
}

export interface PropsPassedToAccount {
    userUid: string,
    handleLogout: Function;
    email: string;
    sendResetPasswordEmail: React.MouseEventHandler;
    deleteAccount: React.MouseEventHandler
}

export interface PropsForProfileInformation {
    userUid: String
}

export interface LooseObject {
    [key: string]: any
}