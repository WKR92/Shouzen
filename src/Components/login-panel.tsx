import React, {useState, useEffect, useCallback } from 'react';
import fire from '../fire';
import Login from './login';
import Account from './account';


function LoginPanel() {
    const [user, setUser] = useState({} as any);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    

    const clearInput = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }

    const handleLogin = () => {
        clearErrors();
        
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disable":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message)
                    break;
                default:
                    break;
            }
            });
        
        clearInput();
    };

    const handleSignUp = () => {
        clearErrors();

        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
        switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                setEmailError(err.message);
                break;
            case "auth/weak-password":
                setPasswordError(err.message);
                break;
            default:
                    break;
        }
        });

        clearInput();
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const sendResetPasswordEmail = () => {
        
        fire
            .auth()
            .sendPasswordResetEmail(user.email)
            .then(() => {alert("Check your email box for password change message")})
            .catch(() => {alert("Something went wrong. Please try again.")})
    }

    const deleteAccount = () => {

        if(window.confirm('Are your sure you want to delete your account?')) {
            user
                .delete()
                .then(() => {alert("Your account has ben deleted")})
                .catch(() => {alert("Something went wrong. Please try again.")})
        }

    }

    const authListener = useCallback(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInput();
                setUser(user);                
            } else {
                setUser("");
            }
        })
    }, [])

    useEffect(() => {
        authListener();
    }, [authListener, user])

    return (
        <div className="LoginPanel">

            {user ? (
                <Account
                handleLogout={handleLogout}
                email={user.email}
                sendResetPasswordEmail={sendResetPasswordEmail}
                deleteAccount={deleteAccount}
            />
            ) : (
                <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
            />
            )}
        </div>
    );
}
export default LoginPanel;