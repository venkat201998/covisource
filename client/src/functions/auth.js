import axios from 'axios';

export const createOrUpdateUser = async (userDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {
            userDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const checkUser = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/check-user`,
        {
            email
        }
    )
}

export const currentUser = async (idToken) =>{
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers:{
                idToken
            }
        }
    )
}

export const createHospital = async (hospitalDetails, email, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-hospital-details`,
        {
            hospitalDetails,
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
} 

export const checkHospital = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/check-hospital`,
        {
            email
        }
    )
}

export const updateHospital = async (hospitalDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/update-hospital`,
        {
            hospitalDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const registerPatientFromHospital = async (patientDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/register-patient-from-hospital`,
        {
            patientDetails
        },
        {
            headers:{
                idToken
            }
        } 
    )
}
export const registerPatientFromUser = async (patientDetails, slug, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/register-patient-from-user`,
        {
            patientDetails,
            slug
        },
        {
            headers:{
                idToken
            }
        } 
    )
}

export const addSlotFromHospital = async (patientEmail, patientStatus, idToken) =>{
    return await axios.post(
        `${process.env.REACT_APP_API}/add-slot`,
        {
            patientEmail,
            patientStatus
        },
        {
            headers:{
                idToken
            }
        } 
    )
}

export const getInactiveHospitals = async (idToken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/get-inactive-hospitals`,
        {
            headers:{
                idToken
            }
        }
    )
} 

export const updateHospitalStatus = async (email, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/update-hospital-status`,
        {
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const removeHospital = async (email, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/remove-hospital`,
        {
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const getHospitals = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/get-hospitals`,
        {
            headers:{
                
            }
        }
    )
} 

export const hospitalsList = async (page) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/hospitals-list`,
        {
            page
        },
        {
            headers:{
                
            }
        }
    )
}

export const updatePatientStatus = async (patientUpdatedDetails, id, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/update-patient-status`,
        {
            patientUpdatedDetails,
            id
        },
        {
            headers:{
                idToken
            }
        }
    )
} 

export const getUsers = async (idToken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/get-users`,
        {
            headers:{
                idToken
            }
        }
    )
}

export const updateUser = async (userDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/update-user`,
        {
            userDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const confirmPatient = async (patientEmail, bookedBy, idToken) => {

    return await axios.post(
        `${process.env.REACT_APP_API}/confirm-patient`,
        {
            patientEmail,
            bookedBy
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const rejectPatient = async (patientEmail, bookedBy, idToken) => {

    return await axios.post(
        `${process.env.REACT_APP_API}/reject-patient`,
        {
            patientEmail,
            bookedBy
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const UpdateSlotStatus = async ( patientEmail,bedType, hospitalEmail, idToken) => {

    return await axios.post(
        `${process.env.REACT_APP_API}/update-slot-status`,
        {
            patientEmail,
            bedType,
            hospitalEmail
        },
        {
            headers:{
                idToken
            }
        }
    )
}
