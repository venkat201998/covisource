import React, { useState } from 'react';
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

    const u = users && users.find((u) => u._id === slug);

    let citiesOptions = null;

    const [firstName, setFirstName] = useState(u && u.firstName);
    const [lastName, setLastName] = useState(u && u.lastName);
    const [dob, setDob] = useState(u && u.dob);
    const [gender, setGender] = useState(u && u.gender);
    const [email, setEmail] = useState(u && u.email);
    const [contact, setContact] = useState(u && u.contact);
    const [address, setAddress] = useState(u && u.address);
    const [state, setState] = useState(u && u.state);
    const [city, setCity] = useState(u && u.city);
    const [pinCode, setPinCode] = useState(u && u.pinCode);
    const [userType, setUserType] = useState(u && u.type);
    

    
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
                    
                            <div className="col-8 offset-1  p-md-4 p-3 text-center shadow">

                                <h3>User Info</h3>
                                <form onSubmit={handleSubmit} >
                                <div class="form-group my-xl-5 my-3 row">
                                <label for="patientName" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Name</label>
                                <div class="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="firstName"
                                        value={firstName}
                                        required
                                        placeholder="First Name"
                                        onChange={(e)=> setFirstName(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div class="col-12 col-md-6 col-xl-4">
                                    <input 
                                        type="text" 
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
                            <div class="form-group my-xl-5 my-3 row">
                                <label for="patientBirthDate" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Birth Date</label>
                                <div class="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        type="date" 
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
                            <div class="form-group my-xl-5 my-3 row">
                                <label for="gender" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Gender</label>
                                <div class="col-12 mb-3 mb-md-0 col-xl-6">
                                    <select class="w-100 h-100 form-select" value={gender} aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                        <option value="sg">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="NA">N/A</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group my-xl-5 my-3 row">
                                <label for="contactNumber" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact Number</label>
                                <div class="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        type="tel" 
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
                            <div className="form-group my-xl-5 my-3 row">
                                <label for="hospitalContact" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Email</label>
                                <div className="col-12 col-xl-8">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"
                                        name="hospitalContact"
                                        value= {email}  
                                        placeholder="Number"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        disabled
                                        />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label for="address" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Address</label>
                                <div className="col-12 col-xl-8">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"  
                                        value={address}
                                        placeholder="Street"
                                        onChange={(e) => setAddress(e.target.value)}/>
                                    </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label for="state" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">State</label>
                                <div className="col-12 col-xl-8">
                                    <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                        <option value="ss">Select State</option>
                                        { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                    <label for="city" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">City</label>
                                    <div className="col-12 col-xl-3 mb-3 mb-xl-0">
                                        <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                            <option value="sc">Select City</option>
                                            {citiesOptions}
                                        </select>
                                    </div>
                                    
                                    <label for="pinCode" className="col-12 col-xl-2 col-form-label text-start text-xl-end fw-bold fs-6">Pin Code</label>
                                    <div className="col-12 col-md-6 col-xl-3">
                                        <input 
                                            type="text"
                                            inputMode="numeric"
                                            className="form-control w-100"
                                            name={pinCode}  
                                            value={pinCode}
                                            pattern="[0-9]{6}" 
                                            maxLength="6"
                                            onChange={(e) => setPinCode(e.target.value)}/>
                                    </div>
                            </div>                            

                            <div className="form-group w-50 mx-auto my-md-5 my-3 d-flex flex-col px-lg-2">
                                <div className="col-lg-5">
                                    <button type="submit" className="btn btn-raised btn-outline-info w-100 mx-auto">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
             </div>
        )
}
export default UpdateUser;