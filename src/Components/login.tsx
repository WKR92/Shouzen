import {PropsPassedToLogin} from '../store/interfaces'
import LogInWithGoogle from './logInWithGoogle';
import LogInWithFB from './logInWithFB';


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
                <LogInWithGoogle />
                <LogInWithFB />
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