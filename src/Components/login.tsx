import React from 'react';

interface PropsPassedToLogin {
    email: string;
    setEmail: Function;
    password: string;
    setPassword: Function;
    handleLogin: Function;
    handleSignUp: Function;
    hasAccount: boolean;
    setHasAccount: Function;
    emailError: string;
    passwordError: string;
}

const Login = (props: PropsPassedToLogin) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;


    return (
        <section className="loginSection">
            <div className="loginContainer">
                <label>Username</label>
                <input 
                    type="text" 
                    autoFocus 
                    required 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={() => handleLogin()}>Sign in</button>
                            <p>Don't have an account? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <button onClick={() => handleSignUp()}>Sign up</button>
                            <p>Have an account? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;