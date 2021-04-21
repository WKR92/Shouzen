import React from 'react';
import axiosSettings from './axiosSettings';

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


    const doPost = (event: React.MouseEvent) => {
        event.preventDefault();
    
        const data = {
            'name': "bob",
            'surname': 'Kamiński'
        }
    
        axiosSettings.post('/data.json', data).then(res => console.log(res)).catch(err => console.log(err));
    }

    return(
        <section className="accountSection">
            <nav>
                <h2>Welcome {email}</h2>
                <button onClick={() => handleLogout()}>Logout</button>
            </nav>
            <main>
                <button className="resetPasswordBtn" onClick={sendResetPasswordEmail}>Reset password</button>
                <button className="deleteAccountBtn" onClick={deleteAccount}>Delete account</button>
                <button onClick={doPost}>doPost</button>
            </main>
        </section>
    )
}

export default Account;