import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { createOrUpdateUser, currentUser } from '../../functions/auth';
import { useDispatch } from 'react-redux';
import UserForm from '../../components/reusables/UserForm';

const RegisterComplete = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [buttons, setButtons] = useState([{name: "Register", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"}]);

    useEffect(()=>{
        setEmail(window.localStorage.getItem('email'));
        setType(window.localStorage.getItem('type'));
        setLoading(false);
    },[])

    const onChange = (e, id, value) => {
        e.preventDefault();
        setLoading(true);
        switch(id){
            case 'password': setPassword(value); break;
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'dob': setDob(value); break;
            case 'gender': setGender(value); break;
            case 'contact': setContact(value); break;
            case 'email': setEmail(value); break;
            case 'type': setType(value); break;
            case 'address': setAddress(value); break;
            case 'state': setState(value); break;
            case 'city': setCity(value); break;
            case 'pinCode': setPinCode(value); break;
        }
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (!email || !password) {
                toast.error("Email and password is required");
                setLoading(false);
                return;
            }
        
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters long");
                setLoading(false);
                return;
            }

            const result = await signInWithEmailLink(auth, email, window.location.href);
            const user = auth.currentUser;
            const idTokenResult = await user.getIdTokenResult();

            if(result.user.emailVerified){
                updatePassword(user, password);
                const userDetails = {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type };
                await createOrUpdateUser(userDetails, idTokenResult.token)
                .then((res) => {
                    toast.success("Registration Success");
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("Registration Failure");
                    setLoading(false);
                });

            }
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("type");


            let options=[];
            let uaoptions=[];

            await currentUser(idTokenResult.token)
            .then((res)=>{
                switch(res.data.type){
                    case 'Admin': options.push('Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword');
                    break;
                    case 'Hospital': options=['Dashboard', 'ManageHospital', 'RegisterPatient', 'ManagePatients', 'PatientsHistory', 'UpdatePassword'];
                    break;
                    case 'User': options=['Dashboard', 'SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'];
                    break;
                    
                }
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        dob: res.data.dob,
                        gender:res.data.gender,
                        email:res.data.email,
                        contact: res.data.contact,
                        address: res.data.address,
                        state: res.data.state,
                        city:res.data.city,
                        pinCode: res.data.pinCode,      
                        type: res.data.type,
                        _id: res.data._id,
                        options: options,
                        uaoptions: uaoptions,
                        slots: res.data.slots,
                        token: res.config.headers.idToken
                    },
                });
                switch(res.data.type){
                    case 'Admin': history.push('/');
                    break;
                    case 'Hospital': history.push("/Hospital/Dashboard");
                    break;
                    case 'User': history.push('/');
                    break;
                    
                }
            })
        }catch(err){
            toast.error(err);
            history.push("/");
        }
    }

    return(
        <div className="container-fluid mt-5 px-md-5">
            <div className="row mt-5 pt-5 mx-2">
                <div className="col-lg-8 col-12 offset-lg-2 p-md-4 p-3 text-center shadow">
                
                {loading ? <h3>Loading...</h3> :
                    <div>
                        <h3>User Registration Complete</h3>
                        <UserForm data={{password, firstName, lastName, dob, gender, email, type, contact, address, state, city, pinCode, disabled}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit}/>
                    </div>
                }

                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;