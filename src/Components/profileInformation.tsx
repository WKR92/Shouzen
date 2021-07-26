import TextFiled from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import fire from '../utils/fire';
import { useState, useCallback, useEffect } from 'react';
import { UserProfile, UserSnap, ProfileInformationProps } from '../store/interfaces';
import { useDispatch } from 'react-redux';
import { manageUserInfo } from '../store/userActions';
import { getUserFromLocalStorage } from '../store/localStorage';

const ProfileInformation = (props: ProfileInformationProps) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [town, setTown] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [submitBtn, setSubmitBtn] = useState(props.submitBtnInitialValue);
    const dispatch = useDispatch();

    const getUserInfo = useCallback(() => {
        const profileInfoRef = fire.database().ref("Profiles");

        profileInfoRef.once('value', (snapshot) => {
            const snaps = snapshot.val();
            if(snaps) {
                const currentUserProfile: UserSnap[] = [];
                for (let id in snaps) {
                    currentUserProfile.push({id, ...snaps[id]})
                }
                const currentUserProfileId = currentUserProfile.filter((e: UserSnap) => e.user === getUserFromLocalStorage().uid);

                if(currentUserProfileId.length > 0) {
                    setName(currentUserProfileId[0].information.name);
                    setSurname(currentUserProfileId[0].information.surname);
                    setTown(currentUserProfileId[0].information.town);
                    setPostCode(currentUserProfileId[0].information.postCode);
                    setCountry(currentUserProfileId[0].information.country);
                    setAddress(currentUserProfileId[0].information.address);
                    setTelephone(currentUserProfileId[0].information.telephone);
                }
            }
        })
    },[])

    useEffect(() => {
        getUserInfo();
        return () => {
            setName('');
            setSurname('');
            setTown('');
            setPostCode('');
            setCountry('');
            setAddress('');
            setTelephone('');
        }
    }, [getUserInfo])

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // gather information
        const profileInformation = {
            user: getUserFromLocalStorage().uid,
            information: {
                name,
                surname,
                town,
                postCode,
                country,
                address,
                telephone
            }
        }

        // update profile
        const profileInfoRef = fire.database().ref("Profiles");
        profileInfoRef.once('value', (snapshot) => {
            const snaps = snapshot.val();
            const currentUserProfile: UserProfile[] = [];
            for (let id in snaps) {
                currentUserProfile.push({id, ...snaps[id]})
            }
            const currentUserProfileId = currentUserProfile.filter((e: UserProfile) => e.user === getUserFromLocalStorage().uid);
            if(currentUserProfileId.length > 0){
                const updateProfileRef = fire.database().ref("Profiles").child(currentUserProfileId[0].id);
                updateProfileRef.update(profileInformation);
            } else {
                profileInfoRef.push(profileInformation);
            }
        })


        // fire functions from props in cart
        if(props.goToPayment) {
            props.goToPayment();
        }
        if(props.dispachFnc) {
            dispatch(manageUserInfo(profileInformation.information));
        } else {
            // fire functions only for profile site
            alert("You profile information were changed successfully.");
            setSubmitBtn(true);
        }  
    }

    return (
        <div className="profileInformation">
            <h2>{props.title}</h2>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <FormControl
                    fullWidth={true}
                >
                    <TextFiled
                        type="text"
                        label="Name"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={name}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        onChange = {(e) => {setName(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="text"
                        label="Surname"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={surname}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        onChange = {(e) => {setSurname(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="text"
                        label="Address"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={address}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        onChange = {(e) => {setAddress(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="text"
                        label="Post code"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={postCode}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor}
                        }}
                        onChange = {(e) => {setPostCode(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="text"
                        label="Town"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={town}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        onChange = {(e) => {setTown(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="text"
                        label="Country"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={country}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        onChange = {(e) => {setCountry(e.target.value); setSubmitBtn(false)}}
                    />
                    <TextFiled
                        type="number"
                        label="Phone"
                        variant="filled"
                        color="primary"
                        disabled={props.isFormDisabled}
                        required={true}
                        value={telephone}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        InputLabelProps={{
                            style: { color: props.textColor },
                        }}
                        InputProps={{
                            inputProps: { 
                                min: 6
                            }
                        }}
                        onChange = {(e) => {setTelephone(e.target.value); setSubmitBtn(false)}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={props.isFormDisabled ? props.isFormDisabled : submitBtn}
                    >
                        {props.btnText}
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
export default ProfileInformation;