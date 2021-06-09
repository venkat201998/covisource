import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { createOrUpdateUser, currentUser } from '../../functions/auth';
import { useDispatch } from 'react-redux';
import HospitalCities from '../hospital/Json/HospitalCities';
import HospitalStates from '../hospital/Json/HospitalStates';

const RegisterComplete = () => {
    const [loading, setLoading] = useState("");
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
    let citiesOptions = null;

    useEffect(()=>{
        setEmail(window.localStorage.getItem('email'));
        setType(window.localStorage.getItem('type'));
    },[])

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await auth.signInWithEmailLink(email, window.location.href);
        const user = auth.currentUser;
        const idTokenResult = await user.getIdTokenResult();

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

        if(result.user.emailVerified){
            user.updatePassword(password);
            const userDetails = {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type };
            createOrUpdateUser(userDetails, idTokenResult.token)
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

        currentUser(idTokenResult.token)
        .then((res)=>{
            switch(res.data.type){
                case 'Admin': options.push('Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword');
                            //   uaoptions.push('Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword');
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
          switch(res.data.type){
            case 'Admin': history.push('/');
            break;
            case 'Hospital': history.push("/Hospital/Dashboard");
            break;
            case 'User': history.push('/');
            break;
            
        }
        })

        

    }

    return(
        <div className="container mt-5">
            <div className="row mt-5 pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">

                    <form onSubmit={handleSubmit} >
                                <div className="form-group mb-4 text-center">
                                    {loading ? <h3>Loading..</h3> :  <h3>User Registration Complete</h3>}
                                </div>
                                <div class="form-group my-xl-5 my-3 row">
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
                                <div class="form-group my-xl-5 my-3 row">
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
                                <div class="form-group my-xl-5 my-3 row">
                
                                    <label htmlFor="password" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Password</label>
                                    <div class="col-md-8 col-12 mb-3 mb-md-1">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control w-100"
                                            value={password}
                                            onChange= {(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div class="form-group my-xl-5 my-3 row">
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
                                <div class="form-group my-xl-5 my-3 row">
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
                                <div class="form-group my-xl-5 my-3 row">
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
                                <div class="form-group my-xl-5 my-3 row">
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
                            
                                <div className="form-group my-xl-5 my-3 row">
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
                                <div className="form-group my-xl-5 my-3 row">
                                    <label htmlFor="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                                    <div className="col-md-8 col-12 mb-3 mb-md-1">
                                        <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                            <option value="ss">Select State</option>
                                            { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-xl-5 my-3 row">
                                    <label htmlFor="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                    <div className="col-md-8 col-12 mb-3 mb-md-1">
                                        <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                            <option value="sc">Select City</option>
                                            {citiesOptions}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group my-xl-5 my-3 row"> 
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

                                <div className="form-group row">
                                    <div className="col-md-4 col-6 offset-md-3 text-start">
                                        <button type="submit" className="btn btn-raised btn-outline-primary">Register</button>
                                    </div>
                                </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;