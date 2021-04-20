import React from 'react';

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

    return(
        <section className="accountSection">
            <nav>
                <h2>Welcome {email}</h2>
                <button onClick={() => handleLogout()}>Logout</button>
            </nav>
            <main>
                <button className="resetPasswordBtn" onClick={sendResetPasswordEmail}>Reset password</button>
                <button className="deleteAccountBtn" onClick={deleteAccount}>Delete account</button>
            </main>
        </section>
    )
}

export default Account;