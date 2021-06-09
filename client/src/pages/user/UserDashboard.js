import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { currentUser, createOrUpdateUser } from "../../functions/auth";
import HospitalCities from '../hospital/Json/HospitalCities';
import HospitalStates from '../hospital/Json/HospitalStates';

const UserDashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
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
    let citiesOptions = null;

    useEffect(()=>{
        currentUser(user.token)
        .then((res)=> {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setDob(res.data.dob);
                setGender(res.data.gender);
                setEmail(res.data.email);
                setContact(res.data.contact);
                setAddress(res.data.address);
                setState(res.data.state);
                setCity(res.data.city);
                setPinCode(res.data.pinCode);      
                setType(res.data.type);
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
                        options: ['Dashboard','SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'],
                        token: res.config.headers.idToken
                    },
                });
        })
        .catch((err) => toast.error(err));
    },[])

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        let answer = window.confirm("Update?");
        if(answer){
            const userDetails = {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type};
            createOrUpdateUser(userDetails, user.token)
            .then((res) => {
                toast.success("Updated Success");
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
                        options: ['Dashboard','SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'],
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
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                <form onSubmit={handleSubmit} className="container-fluid" >
                    <div className="form-group mb-4 text-center">
                        <h3>User Info</h3>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="patientName" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Name</label>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text" 
                                id="patientName"
                                className="form-control w-100"  
                                name="firstName"
                                value={firstName}
                                required
                                placeholder="First Name"
                                onChange={(e)=> setFirstName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="patientName" 
                                className="form-control w-100"  
                                name="lastName"
                                value={lastName}
                                required
                                placeholder="Last Name"
                                onChange={(e)=> setLastName(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="patientBirthDate" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Birth Date</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="date" 
                                id="patientBirthDate"
                                className="form-control w-100"  
                                name="patientBirthDate"
                                value={dob}
                                required
                                placeholder="Date of Birth"
                                onChange={(e)=> setDob(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="gender" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Gender</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <select class="w-100 h-100 form-select" id="gender" value={gender} aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                <option value="sg">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="NA">N/A</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="contactNumber" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact Number</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="tel" 
                                id="contactNumber"
                                className="form-control w-100"  
                                name="contactNumber"
                                value={contact}
                                required
                                placeholder="Contact"
                                onChange={(e)=> setContact(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="email" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">E-mail</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="email" 
                                id="email"
                                className="form-control w-100"  
                                name="email"
                                value={email}
                                disabled
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-4 my-3 row">
                        <label htmlFor="userType" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Type</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text" 
                                id="userType"
                                className="form-control w-100"  
                                name="type"
                                value={type}
                                disabled
                            /> 
                        </div>
                    </div>
                            
                    <div className="form-group my-xl-4 my-3 row">
                        <label htmlFor="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text" 
                                id="address"
                                className="form-control w-100"  
                                value={address}
                                placeholder="Street"
                                onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                    </div>
                    <div className="form-group my-xl-4 my-3 row">
                        <label htmlFor="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                <option value="ss">Select State</option>
                                { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }

                            </select>
                        </div>
                    </div>
                    <div className="form-group my-xl-4 my-3 row">
                        <label htmlFor="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                <option value="sc">Select City</option>
                                {citiesOptions}
                            </select>
                        </div>
                    </div>

                    <div className="form-group my-xl-4 my-3 row"> 
                        <label htmlFor="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="pinCode"
                                inputMode="numeric"
                                className="form-control w-100"
                                name={pinCode}  
                                value={pinCode}
                                pattern="[0-9]{6}" 
                                maxLength="6"
                                onChange={(e) => setPinCode(e.target.value)}/>
                        </div>
                    </div>                            

                    <div className="form-group row justify-content-center">
                        <div className="col-md-4 col-9 text-center">
                            <button type="submit" className="btn btn-raised btn-outline-primary">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export default UserDashboard;