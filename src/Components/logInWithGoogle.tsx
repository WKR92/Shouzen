import googleIcon from '../icons/googleIcon.png';
import fire from 'firebase/app';
import 'firebase/auth';

const LogInWithGoogle = () => {

    let googleProvider = new fire.auth.GoogleAuthProvider();

    const openGooglePopup = () => {
        fire.auth().signInWithPopup(googleProvider)
        .catch( err => {
            if(err?.code === "auth/account-exists-with-different-credential") {
                alert("An account already exists with the same email address but different sign-in credentials. Please log in using Facebook or standard form.")
            } else {
                 console.log(err);
            }
        })
    }

    return (
        <div className="googleLoginContainer">
            <button className="googleBtnContainer" onClick={openGooglePopup}>
                <div className="googleBtnText" > Log in with Google</div>
                <div className="googleBtnIconHolder" >
                    <img alt="google" src={googleIcon} />
                </div> 
            </button>
        </div>
    )
}
export default LogInWithGoogle;