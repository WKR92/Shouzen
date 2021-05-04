import { connect } from 'react-redux';
import * as userAction from '../store/userActions';
import {UserInfo, UserInfoTableProps} from '../store/interfaces';
import { RootState } from '../store/store';
import {useEffect} from 'react';

const UserInfoTable = (props: UserInfoTableProps) => {

    useEffect(() => {
        const telInput = document.querySelector(".telephone") as HTMLInputElement;
        const telLabel = document.querySelector(".telLabel") as HTMLLabelElement;
        const postCode = document.querySelector(".postCode") as HTMLInputElement;
        const postCodeLabel = document.querySelector(".postCodeLabel") as HTMLLabelElement
        telInput.addEventListener('focus', () => {
            telLabel.style.display = 'block';
        })
        telInput.addEventListener('focusout', () => {
            telLabel.style.display = 'none';
        })
        postCode.addEventListener('focus', () => {
            postCodeLabel.style.display = 'block';
        })
        postCode.addEventListener('focusout', () => {
            postCodeLabel.style.display = 'none';
        })
    }, [])

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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

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
            const userInfoTableSubmitBtn = document.querySelector('.userInfoTableSubmitBtn') as HTMLButtonElement;
            goBackToCartBtn.style['display'] = "none";
            userInfoTableSubmitBtn.style['display'] = "none";
            inputList.forEach(e => e.disabled = true);
        }, 800);
    }

    const goBackToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
        window.scrollTo(0, 0);
        setTimeout(() => {
            props.setShowUserInfoTable(false);
        }, 800) 
    }

    return(
        <div id="userInfoTable" className="userInfoTableOuterContainer">
            <form onSubmit={(event) => handleSubmit(event)} className="userInfoTableForm"> 
                <h2>Where and to whom should we deliver the shoes?</h2>
                <input type="text" minLength={3} className="name" placeholder="name" required pattern="\D*"/>
                <input type="text" minLength={3} className="surname" placeholder="surname" required pattern="\D*"/>
                <input type="address" minLength={3} className="address" placeholder="address" required />
                <div className="postAndTownInputsContainer">
                    <div className="postCodeHolder">
                        <input type="text" maxLength={6} className="postCode" pattern="\d{2}-\d{3}" 
                        placeholder="post code" required id="postCode" />
                        <label className="postCodeLabel" htmlFor="postCode">format: xx-xxx</label>
                    </div>
                    <input type="text" minLength={3} className="town" placeholder="town" required
                    pattern="\D*" />
                </div>
                <input type="text" minLength={3} className="country" placeholder="country" required pattern="\D*" />
                <input type="tel" minLength={3} className="telephone" placeholder="telephone" 
                pattern="\d{3}-\d{3}-\d{3}" required id="tel" autoComplete="off" />
                <label className="telLabel" htmlFor="tel">format: xxx-xxx-xxx</label>
                <div className="btnsContainer">
                    <button type="button" onClick={(event: React.MouseEvent<HTMLButtonElement>) => goBackToCart(event)} 
                    className="goBackToCartBtn">
                        Change cart
                    </button>
                    <button type="submit" className="userInfoTableSubmitBtn">Go to payment</button>
                </div>
                
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