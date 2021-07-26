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

export interface LoggedUserInfoAction {
    type: string,
    payload: LooseObject
}

export interface PaymentProps {
    setShowModal: Function,
    total: number,
    setShowPaymentForm: Function,
    setIsFormDisabled: Function,
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
    setShowUserInfoTable: Function,
    setIsFormDisabled: Function,
    isFormDisabled: boolean
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
        telephone: string,
        postCode: string,
        address: string
    },
    user: string
}

export interface PropsPassedToAccount {
    handleLogout: Function;
    sendResetPasswordEmail: React.MouseEventHandler;
    deleteAccount: React.MouseEventHandler
}

export interface PropsForProfileInformation {
    getUserFromLocalStorage: Function
}

export interface LooseObject {
    [key: string]: any
}

export interface ProfileInformationProps {
    dispachFnc?: boolean,
    goToPayment?: Function,
    title: string,
    btnText: string,
    backgroundColor: string,
    textColor: string,
    submitBtnInitialValue: boolean,
    isFormDisabled: boolean
}

export interface TYModalProps {
    setShowModal: Function,
}

export interface ProductsTableProps {
    total: number,
    setTotal: Function,
    closeNextSteps: Function,
    openUserInfoTable: Function
}

export interface Orders {
    costOfOrder: string,
    data: string,
    id: string,
    whatIsOrdered: [[string, number]],
    whoISOrdering: [
      {name: string
      surname: string,
      town: string,
      country: string
      telephone: string,
      postCode: string,
      address: string}
    ]
}