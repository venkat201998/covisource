import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import UserForm from '../../components/reusables/UserForm';

const UserDashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    const token = user && user.token;
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [buttons, setButtons] = useState([{name: "Save Changes", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"}]);


    useEffect(()=>{
        if(user){
            setFirstName(user && user.firstName);
            setLastName(user && user.lastName);
            setDob(user && user.dob);
            setGender(user && user.gender);
            setEmail(user && user.email);
            setContact(user && user.contact);
            setAddress(user && user.address);
            setState(user && user.state);
            setCity(user && user.city);
            setPinCode(user && user.pinCode);      
            setType(user && user.type);
            setLoading(false);
        }
    },[user])

    const onChange = (e, id, value) => {
        e.preventDefault();
        setLoading(true);
        switch(id){
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

    let options=[];
    let uaoptions=[];

    const handleSubmit = async (e) => {
        e.preventDefault();

        let answer = window.confirm("Update?");
        if(answer){
            const userDetails = {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type};
            createOrUpdateUser(userDetails, token)
            .then((res) => {
                toast.success("Updated Success");
                switch(res.data.type){
                    case 'Admin': options = ['Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword'];
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
                        token: res.config.headers.idToken
                    },
                  });
            })
            .catch((err) => {
                toast.error("Update Failure");
            });

        }
    }
    
    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">

                {loading ? <h3>Loading...</h3> :
                    <div>
                        <h3>User Info</h3>
                        <UserForm data={{firstName, lastName, dob, gender, email, type, contact, address, state, city, pinCode, disabled}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit}/>
                    </div>
                }

            </div>
    );
};

export default UserDashboard;