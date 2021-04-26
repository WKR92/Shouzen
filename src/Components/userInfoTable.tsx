import { connect } from 'react-redux';
import * as userAction from '../store/userActions';
import {UserInfo, UserInfoTableProps} from '../store/interfaces';
import { RootState } from '../store/store';
import {useEffect} from 'react';

const UserInfoTable = (props: UserInfoTableProps) => {

    useEffect(() => {
        if(props.userInfo.length > 0){
            const name = document.querySelector('.name') as HTMLInputElement;
            const surname = document.querySelector('.surname') as HTMLInputElement;
            const address = document.querySelector('.address') as HTMLInputElement;
            const postCode = document.querySelector('.postCode') as HTMLInputElement;
            const town = document.querySelector('.town') as HTMLInputElement;
            const country = document.querySelector('.country') as HTMLInputElement;
            const telephone = document.querySelector('.telephone') as HTMLInputElement;

            name.value = props.userInfo[0].name;
            surname.value = props.userInfo[0].surname;
            address.value = props.userInfo[0].address;
            postCode.value = props.userInfo[0].postCode;
            town.value = props.userInfo[0].town;
            country.value = props.userInfo[0].country;
            telephone.value = props.userInfo[0].telephone;
        }
    }, [props])

    const handleSubmit = () => {

        const name = document.querySelector('.name') as HTMLInputElement;
        const surname = document.querySelector('.surname') as HTMLInputElement;
        const address = document.querySelector('.address') as HTMLInputElement;
        const postCode = document.querySelector('.postCode') as HTMLInputElement;
        const town = document.querySelector('.town') as HTMLInputElement;
        const country = document.querySelector('.country') as HTMLInputElement;
        const telephone = document.querySelector('.telephone') as HTMLInputElement;

        const userInfo = {
            'name'      : name.value,
            'surname'   : surname.value,
            'address'   : address.value,
            'postCode'  : postCode.value,
            'town'      : town.value,
            'country'   : country.value,
            'telephone' : telephone.value
        }

        props.getUserInfo(userInfo);
        props.setShowPaymentForm(true);

        setTimeout(() => {
            const goBackToCartBtn = document.querySelector('.goBackToCartBtn') as HTMLButtonElement;
            const inputList = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
            goBackToCartBtn.style['display'] = "none";
            inputList.forEach(e => e.disabled = true);
        }, 800);
    }

    const goBackToCart = () => {
        const continueBtn = document.querySelector('.continueBtn') as HTMLButtonElement;
        const userInfoTable = document.getElementById('userInfoTable') as HTMLDivElement;
        const removeItemsBox = document.querySelector('.removeItemsBox') as HTMLDivElement;
        const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
        const removeProductBtnHolderList = document.querySelectorAll('.removeProductBtnHolder') as NodeListOf<HTMLDivElement>;
        const amountToOderHolderList = document.querySelectorAll('.amountToOderHolder') as NodeListOf<HTMLDivElement>;
        removeItemsBox.style['display'] = '';
        checkboxList.forEach(e => e.disabled = false)
        removeProductBtnHolderList.forEach(e => e.style['display'] = '')
        amountToOderHolderList.forEach(e => e.style['display'] = '') 
        userInfoTable.style['transform'] = 'translateY(-100%)'
        userInfoTable.style['opacity'] = '0'
        userInfoTable.style['transition'] = 'all 800ms'
        continueBtn.style['display'] = '';
        window.scrollBy(0, -(userInfoTable.scrollHeight + 100));
        setTimeout(() => {
            props.setShowUserInfoTable(false);
        }, 800) 
    }

    return(
        <div id="userInfoTable" className="userInfoTableOuterContainer">
            <button onClick={goBackToCart} className="goBackToCartBtn">Go back to cart</button>
            <form onSubmit={handleSubmit} className="userInfoTableForm"> 
                <h2>Where and to whom should we deliver the shoes?</h2>
                <input type="text" minLength={3} className="name" placeholder="name" required />
                <input type="text" minLength={3} className="surname" placeholder="surname" required />
                <input type="address" minLength={3} className="address" placeholder="address" required />
                <div className="postAndTownInputsContainer">
                    <input type="text" maxLength={6} className="postCode" pattern="\d{2}-\d{3}" 
                    placeholder="post code in format xx-xxx" required />
                    <input type="text" minLength={3} className="town" placeholder="town" required />
                </div>
                <input type="text" minLength={3} className="country" placeholder="country" required />
                <input type="tel" minLength={3} className="telephone" placeholder="telephone in format xxx-xxx-xxx" 
                pattern="\d{3}-\d{3}-\d{3}" required />
                <button type="submit" className="userInfoTableSubmitBtn">Go to payment</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        userInfo: state.userReducer
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getUserInfo: (info: UserInfo) => dispatch(userAction.manageUserInfo(info))
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(UserInfoTable);