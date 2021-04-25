import { connect } from 'react-redux';
import * as productAction from '../store/userActions';
import {UserInfo} from '../store/interfaces';
import { RootState } from '../store/store';
import {useEffect} from 'react';

interface UserInfoTableProps {
    setShowPaymentForm: Function,
    userInfo: any,
    getUserInfo: any
}

const UserInfoTable = (props: UserInfoTableProps) => {

    useEffect(() => {
        if(props.getUserInfo.length > 0){
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
        console.log(props.userInfo)
    }

    return(
        <div id="userInfoTable" className="userInfoTableOuterContainer">
            <form onSubmit={handleSubmit} className="userInfoTableForm"> 
                <h2>Where and to whom should we deliver the shoes?</h2>
                <input type="text" minLength={3} className="name" placeholder="name" required />
                <input type="text" minLength={3} className="surname" placeholder="surname" required />
                <input type="address" minLength={3} className="address" placeholder="address" required />
                <div className="postAndTownInputsContainer">
                    <input type="text" maxLength={6} className="postCode" pattern="\d{2}-\d{3}" placeholder="post code with format 00-000" required />
                    <input type="text" minLength={3} className="town" placeholder="town" required />
                </div>
                <input type="text" minLength={3} className="country" placeholder="country" required />
                <input type="tel" minLength={3} className="telephone" placeholder="telephone" required />
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
        getUserInfo: (info: UserInfo) => dispatch(productAction.manageUserInfo(info))
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(UserInfoTable);