import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideNav from '../../components/sideNav/SideNav';
import { updateHospital, removeHospital } from '../../functions/auth';
import HospitalForm from '../../components/reusables/HospitalForm';

const UpdateHospital = () =>{
    const { user, hospitals } = useSelector((state) => ({ ...state }));
    const token = user && user.token;
    const { slug } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();    
    
    let hospital = {};
    const [hospitalName, setHospitalName] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [generalBeds, setGeneralBeds] = useState();
    const [icuBeds, setIcuBeds] = useState();
    const [ventilatorBeds, setVentilatorBeds] = useState();
    const [oxygenBeds, setOxygenBeds] = useState();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [buttons, setButtons] = useState([
        {name: "Update", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"},
        {name: "Delete", type: "reset", className: "btn btn-outline-danger btn-raised fw-bold"}
    ]);

    useEffect(() => {
        if(hospitals){
            hospital = hospitals.find((hospital)=> hospital._id===slug);
            setHospitalName(hospital && hospital.hospitalName);
            setAddress(hospital && hospital.streetAddress);
            setState(hospital && hospital.state);
            setCity(hospital && hospital.city);
            setPinCode(hospital && hospital.pinCode);
            setContact(hospital && hospital.contact);
            setEmail(hospital && hospital.email);
            setGeneralBeds(hospital && hospital.generalBeds);
            setIcuBeds(hospital && hospital.icuBeds);
            setVentilatorBeds(hospital && hospital.ventilatorBeds);
            setOxygenBeds(hospital && hospital.oxygenBeds);
            setStatus(hospital && hospital.status);
            setLoading(false);
        }
    }, [user, hospitals])

    const onChange = (e, id, value) => {
        e.preventDefault();
        setLoading(true);
        switch(id){
            case "hospitalName": setHospitalName(value); break;
            case "address": setAddress(value); break;
            case "pinCode": setPinCode(value); break;
            case "state": setState(value); break;
            case "city":  setCity(value); break;
            case "hospitalContact": setContact(value); break;
            case "hospitalEmail": setEmail(value); break;
            case "generalBeds": setGeneralBeds(value); break;
            case "icuBeds": setIcuBeds(value); break;
            case "ventilatorBeds": setVentilatorBeds(value); break;
            case "oxygenBeds": setOxygenBeds(value); break;
        }
        setLoading(false);
        
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, email, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, status};
        
        let answer = window.confirm("Update Hospital Details?");
        if(answer){
            updateHospital(hospitalDetails, token)
            .then((res) => {
                if(res.data!=="Update Failed"){
                    dispatch({
                        type: "ACTIVE_HOSPITALS",
                        payload: res.data.hospitals
                    })
                    toast.success("Hospital Updated Successfully");
                }
            })
            .catch((err) => toast.error(err))
        }else{
            toast.error("Failed To Update")
        }

        
    }

    const handleReset = async (e) =>{
        e.preventDefault();

        let answer = window.confirm("Delete Hospital?");
        if(answer){
            removeHospital(email, token)
            .then((res) => {
                if(res.data!=="Failed To Remove The Hospital"){
                    dispatch({
                        type: "ACTIVE_HOSPITALS",
                        payload: res.data.hospitals
                    })
                    toast.success("Hospital Removed Successfully");
                    history.push('/Admin/ManageHospitals');
                }
            })
            .catch((err) => toast.error(err))
        }else{
            toast.error("Failed To Delete");
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
                                <h3>Hospital Info</h3>
                                <HospitalForm data={{hospitalName, address, state, city, pinCode, contact, email, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, disabled}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit} handleReset={handleReset}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default UpdateHospital;