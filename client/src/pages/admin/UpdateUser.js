import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import SideNav from '../../components/sideNav/SideNav';
import { updateUser } from '../../functions/auth';

const UpdateUser = () =>{
    const { users, user } = useSelector((state) => ({...state}));
    const { slug } = useParams();
    const dispatch = useDispatch();

    let citiesOptions = null;

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
    const [userType, setUserType] = useState();
    const [loading, setLoading] = useState(true);

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
            setUserType(user && user.type);
            setLoading(user && false);
        }
    },[user, users])
    
   
    HospitalCities.map((item)=>{
            if(item.state===state)
            citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const userDetails = {firstName, lastName, dob, gender, email, contact, address, state, city, pinCode };
        let answer = window.confirm("Update User Details?");
        if(answer){
            updateUser(userDetails, user.token)
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
                                    <form onSubmit={handleSubmit} >
                                        <div class="form-group my-xl-5 my-3 row">
                                            <label for="patientName" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Patient Name</label>
                                            <div class="col-md-4 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="text" 
                                                    className="form-control w-100"  
                                                    name="firstName"
                                                    value={firstName}
                                                    required
                                                    placeholder="First Name"
                                                    onChange={(e)=> setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div class="col-md-4 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="text" 
                                                    className="form-control w-100"  
                                                    name="lastName"
                                                    value={lastName}
                                                    required
                                                    placeholder="Last Name"
                                                    onChange={(e)=> setLastName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group my-xl-5 my-3 row">
                                            <label for="patientBirthDate" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Birth Date</label>
                                            <div class="col-md-8 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="date" 
                                                    className="form-control w-100"  
                                                    name="patientBirthDate"
                                                    value={dob}
                                                    required
                                                    placeholder="Date of Birth"
                                                    onChange={(e)=> setDob(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group my-xl-5 my-3 row">
                                            <label for="gender" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Gender</label>
                                            <div class="col-md-8 col-12 mb-3 mb-md-1">
                                                <select class="w-100 h-100 form-select" value={gender} aria-label="Default select example" required onChange={(e)=> setGender(e.target.value)}>
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="NA">N/A</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group my-xl-5 my-3 row">
                                            <label for="contactNumber" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact</label>
                                            <div class="col-md-8 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="tel" 
                                                    className="form-control w-100"  
                                                    name="contactNumber"
                                                    value={contact}
                                                    required
                                                    placeholder="Contact Number"
                                                    onChange={(e)=> setContact(e.target.value)}
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group my-xl-5 my-3 row">
                                            <label for="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="text" 
                                                    className="form-control w-100"
                                                    name="hospitalContact"
                                                    value= {email}  
                                                    placeholder="Email"
                                                    onChange={(e)=> setEmail(e.target.value)}
                                                    disabled
                                                    />
                                            </div>
                                        </div>
                                        <div className="form-group my-xl-5 my-3 row">
                                            <label for="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                <input 
                                                    type="text" 
                                                    className="form-control w-100"  
                                                    value={address}
                                                    required 
                                                    placeholder="Street Address"
                                                    onChange={(e) => setAddress(e.target.value)}/>
                                                </div>
                                        </div>
                                        <div className="form-group my-xl-5 my-3 row">
                                            <label for="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                <select className="w-100 h-100 form-select" aria-label="Default select example" value={state} required onChange={(e)=> setState(e.target.value) }>
                                                    <option value="">Select State</option>
                                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group my-xl-5 my-3 row">
                                                <label for="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                    <select className="w-100 h-100 form-select" aria-label="Default select example" value={city} required onChange={(e)=> setCity(e.target.value) }>
                                                        <option value="">Select City</option>
                                                        {citiesOptions}
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="form-group my-xl-5 my-3 row">
                                                <label for="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                    <input 
                                                        type="text"
                                                        inputMode="numeric"
                                                        className="form-control w-100"
                                                        name={pinCode}  
                                                        value={pinCode}
                                                        required
                                                        pattern="[0-9]{6}" 
                                                        maxLength="6"
                                                        placeholder="Pin Code"
                                                        onChange={(e) => setPinCode(e.target.value)}/>
                                                </div>
                                        </div>                            

                                        <div className="form-group row justify-content-center">
                                            <div className="col-lg-2 col-md-3 col-5">
                                                <button type="submit" className="btn btn-raised btn-outline-success fw-bold">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}
export default UpdateUser;