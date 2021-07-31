import OrdersHistory from './ordersHistory';
import ProfileInformation from './profileInformation';
import { PropsPassedToAccount } from '../store/interfaces';

import { useSelector } from 'react-redux';
import { LooseObject } from '../store/interfaces';


const Account = (props: PropsPassedToAccount) => {

    const {
        handleLogout,
        sendResetPasswordEmail,
        deleteAccount
    } = props;

    const user = useSelector((state: LooseObject) => state.loggedUserReducer);

    return(
        <section className="accountSection">
            <header>
                <h2>Welcome {user[0].email}</h2>
                <div className="header__btnsHolder">
                    <button onClick={() => {console.log(user); handleLogout()}}>Logout</button>
                    <button className="resetPasswordBtn" onClick={sendResetPasswordEmail}>Reset password</button>
                    <button className="deleteAccountBtn" onClick={deleteAccount}>Delete account</button>
                </div>
            </header>
            <main>
                <div className="blocksHolder">
                    <div className="infoBlock">
                        <ProfileInformation 
                        title={'Profile information: '}
                        btnText={'Update profile information'}
                        backgroundColor={"rgba(0, 0, 0, 0.5)"}
                        textColor={'#fff'}
                        submitBtnInitialValue={true}
                        isFormDisabled={false}
                        />
                    </div>
                    <div className="ordersHistoryBlock">
                        <OrdersHistory />
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Account;