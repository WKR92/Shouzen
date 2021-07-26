import { UserInfoTableProps } from '../store/interfaces';
import ProfileInformation from './profileInformation';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';


const UserInfoTable = (props: UserInfoTableProps) => {

    const goToPayment = () => {
        props.setShowPaymentForm(true);

        setTimeout(() => {
            props.setIsFormDisabled(true);
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
        removeItemsBox.style['visibility'] = 'visible';
        checkboxList.forEach(e => e.disabled = false)
        removeProductBtnHolderList.forEach(e => e.style['visibility'] = 'visible')
        amountToOderHolderList.forEach(e => e.style['visibility'] = 'visible')
        userInfoTable.style['transform'] = 'translateY(-100%)'
        userInfoTable.style['opacity'] = '0'
        userInfoTable.style['transition'] = 'all 800ms'
        continueBtn.style['display'] = '';
        window.scrollTo(0, 0);
        setTimeout(() => {
            props.setShowUserInfoTable(false);
        }, 800) 
    }

    useEffect(() => {
        const continueBtn = document.querySelector('.continueBtn') as HTMLButtonElement;
        const userInfoTable = document.getElementById('userInfoTable') as HTMLDivElement;
        const userInfoTableTopLine = userInfoTable.offsetTop;
        window.scrollTo({ top: userInfoTableTopLine - 20, behavior: 'smooth'});
        userInfoTable.style['transform'] = 'translateY(0)'
        userInfoTable.style['opacity'] = '1'
        userInfoTable.style['transition'] = 'all 800ms'
        setTimeout(() => { 
        continueBtn.style['display'] = 'none';
        }, 800); 
    }, [])

    return(
        <div id="userInfoTable" className="userInfoTableOuterContainer">
            <div className="userInfoTableForm">
                <ProfileInformation 
                dispachFnc={true}
                goToPayment={goToPayment}
                title={'Where and to whom should we deliver the shoes?'}
                btnText={'Go to payment'}
                backgroundColor={"rgba(0, 0, 0, 0.3)"}
                textColor={'#fff'}
                submitBtnInitialValue={false}
                isFormDisabled={props.isFormDisabled}
                />
                <Button
                fullWidth
                variant="contained"
                color="secondary"
                disabled={props.isFormDisabled}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => goBackToCart(event)}
                style={{ margin: "0 0 20px 0"}}
                >
                Change cart
                </Button>
            </div>
        </div>
    )
}
export default UserInfoTable;