import TextFiled from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import fire from '../fire';
import { useState, useCallback, useEffect } from 'react';
import { UserProfile, UserSnap, LooseObject } from '../store/interfaces';



const ProfileInformation = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [town, setTown] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const getUserFromLocalStorage = () => {
        let user = localStorage.getItem('user');
        let loggedUser: LooseObject = {}
        if(user){
            loggedUser = JSON.parse(user);
        }
        return loggedUser
    }

    const getUserInfo = useCallback(() => {
        const profileInfoRef = fire.database().ref("Profiles");
        profileInfoRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            const currentUserProfile: UserSnap[] = [];
            for (let id in snaps) {
                currentUserProfile.push({id, ...snaps[id]})
            }
            const currentUserProfileId = currentUserProfile.filter((e: any) => e.user === getUserFromLocalStorage().uid);

            setName(currentUserProfileId[0].information.name);
            setSurname(currentUserProfileId[0].information.surname);
            setTown(currentUserProfileId[0].information.town);
            setPostCode(currentUserProfileId[0].information.postCode);
            setCountry(currentUserProfileId[0].information.country);
            setAddress(currentUserProfileId[0].information.address);
            setPhone(currentUserProfileId[0].information.phone);
        })
    },[])

    useEffect(() => {
        getUserInfo();
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
                phone
            }
        }

        // update profile
        const profileInfoRef = fire.database().ref("Profiles");
        profileInfoRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            const currentUserProfile: UserProfile[] = [];
            for (let id in snaps) {
                currentUserProfile.push({id, ...snaps[id]})
            }
            const currentUserProfileId = currentUserProfile.filter((e: any) => e.user === getUserFromLocalStorage().uid);
            if(currentUserProfileId.length > 0){
                const updateProfileRef = fire.database().ref("Profiles").child(currentUserProfileId[0].id);
                updateProfileRef.update(profileInformation);
            } else {
                profileInfoRef.push(profileInformation);
            }
        })

        // alert user
        alert("You profile information were changed successfully.");
        getUserInfo();
    }

    return (
        <div className="profileInformation" transition-style="in:circle:top-right">
            <h2>Profile information: </h2>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <FormControl
                    fullWidth={true}
                >
                    <TextFiled
                        type="text"
                        label="Name"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={name}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange = {(e) => setName(e.target.value)}
                    />
                    <TextFiled
                        type="text"
                        label="Surname"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={surname}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange = {(e) => setSurname(e.target.value)}
                    />
                    <TextFiled
                        type="text"
                        label="Address"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={address}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange = {(e) => setAddress(e.target.value)}
                    />
                    <TextFiled
                        type="text"
                        label="Post code"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={postCode}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff'}
                        }}
                        onChange = {(e) => setPostCode(e.target.value)}
                    />
                    <TextFiled
                        type="text"
                        label="Town"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={town}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange = {(e) => setTown(e.target.value)}
                    />
                    <TextFiled
                        type="text"
                        label="Country"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={country}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange = {(e) => setCountry(e.target.value)}
                    />
                    <TextFiled
                        type="number"
                        label="Phone"
                        variant="filled"
                        color="primary"
                        required={true}
                        value={phone}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        InputProps={{
                            inputProps: { 
                                min: 6
                            }
                        }}
                        onChange = {(e) => setPhone(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Update profile information
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
export default ProfileInformation;