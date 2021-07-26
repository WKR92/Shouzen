import OrdersHistory from './ordersHistory';
import ProfileInformation from './profileInformation';
import { PropsPassedToAccount } from '../store/interfaces';
import { getUserFromLocalStorage } from '../utils/functions';


const Account = (props: PropsPassedToAccount) => {

    const {
        handleLogout,
        sendResetPasswordEmail,
        deleteAccount
    } = props;

    return(
        <section className="accountSection">
            <header>
                <h2>Welcome {getUserFromLocalStorage().email}</h2>
                <div className="header__btnsHolder">
                    <button onClick={() => handleLogout()}>Logout</button>
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