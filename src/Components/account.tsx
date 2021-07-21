import React, { useState } from 'react';
import OrdersHistory from './ordersHistory';
import fire from '../fire';

interface PropsPassedToAccount {
    handleLogout: Function;
    email: string;
    sendResetPasswordEmail: React.MouseEventHandler;
    deleteAccount: React.MouseEventHandler
}
const Account = (props: PropsPassedToAccount) => {

    const {
        handleLogout,
        email,
        sendResetPasswordEmail,
        deleteAccount
    } = props;

    const [showOrdersHistory, setshowOrdersHistory] = useState(false);
    const [showProfileInfo, setShowProfileInfo] = useState(false);

    const user = fire.auth().currentUser!;
    const getOrdersHistory = () => {
        const ordersHistoryRef = fire.database().ref('Orders');
        ordersHistoryRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            const userSnaps = Object.values(snaps).filter((e: any) => e.user === user.uid);
            console.log(userSnaps)
        })
    }

    return(
        <section className="accountSection" transition-style="in:wipe:bottom-left">
            <header>
                <h2>Welcome {email}</h2>
                
                <div className="header__btnsHolder">
                    <button onClick={() => handleLogout()}>Logout</button>
                    <button className="resetPasswordBtn" onClick={sendResetPasswordEmail}>Reset password</button>
                    <button className="deleteAccountBtn" onClick={deleteAccount}>Delete account</button>
                </div>
            </header>
            <main>
                <div className="blocksHolder">
                    <div className="infoBlock">
                        <button>Update your profile information</button>
                    </div>
                    <div className="ordersHistoryBlock">
                        {/* <button onClick={getOrdersHistory}>Display orders history</button> */}
                        <OrdersHistory />
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Account;