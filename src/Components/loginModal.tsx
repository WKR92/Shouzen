import {Link} from 'react-router-dom';
import { LoginModalProps } from '../store/interfaces';

const LoginModal = (props: LoginModalProps) => {
    return (
        <div className="loginModal">
            <div className="loginModalInnerContainer" transition-style="in:circle:hesitate">
                <h3>You are not logged</h3>
                <p>Sorry, but you have to be logged in to proceed.</p>
                <div className="loginModalInnerContainer_btns">
                    <p>Go to </p>
                    <Link className="goToLogInPageBtn" to={"/login"}>
                        Log In page
                    </Link>
                    <p>or </p>
                    <button className="resignBtn" onClick={() => props.setShowLoginModal(false)}>Resign</button>
                </div>
            </div>
        </div>
    )
}
export default LoginModal;