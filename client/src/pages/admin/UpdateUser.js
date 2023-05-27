import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../../components/reusables/UserForm';
import SideNav from '../../components/sideNav/SideNav';
import { updateUser } from '../../functions/auth';


const UpdateUser = () =>{
    const { users, user } = useSelector((state) => ({...state}));
    const token = user && user.token;
    const { slug } = useParams();
    const dispatch = useDispatch();


    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [type, setType] = useState();
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [buttons, setButtons] = useState([{name: "Update", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"}]);

    useEffect(() => {
        if(users){
            let user = users.find((user) => user._id === slug);
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
    },[user, users])
    

    
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const userDetails = {firstName, lastName, dob, gender, email, contact, address, state, city, pinCode };
        let answer = window.confirm("Update User Details?");
        if(answer){
            updateUser(userDetails, token)
            .then((res) => {
                if(res.data !== "Update Failed"){
                    dispatch({
                        type: "REGISTERED_USERS",
                        payload: res.data
                    })
                    toast.success("User Deatils Updated")
                }else{
                    toast.error("Update Failed")
                }
            })
            .catch((err) => toast.error("Update Failed"))  
        }else{
            toast.error("Failed To Update");
        }      
    }

    


        return(
            <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow border">
                                {loading ? <h3>Loading...</h3> :
                                    <div>
                                        <h3>User Info</h3>
                                        <UserForm data={{firstName, lastName, dob, gender, email, type, contact, address, state, city, pinCode, disabled}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}
export default UpdateUser;