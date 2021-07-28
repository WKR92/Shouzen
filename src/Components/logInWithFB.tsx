import facebookIcon from '../icons/facebookIcon.png'
import fire from 'firebase/app';
import 'firebase/auth';

const LogInWithFB = () => {

    let facebookProvider = new fire.auth.FacebookAuthProvider();

    const openFacebookPopup = () => {
        fire.auth().signInWithPopup(facebookProvider)
        .catch( err => {
            if(err?.code === "auth/account-exists-with-different-credential") {
                alert("An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.")
            } else {
                 console.log(err);
            }
        })
    }

    return (
        <div className="facebookLoginContainer">
            <button className="facebookBtnContainer" onClick={openFacebookPopup}>
                <div className="facebookBtnText" > Log in with Facebook</div>
                <div className="facebookBtnIconHolder" >
                    <img alt="facebook" src={facebookIcon} />
                </div> 
            </button>
        </div>
    )
}
export default LogInWithFB;