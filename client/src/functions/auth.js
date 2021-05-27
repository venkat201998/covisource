import axios from 'axios';

export const createOrUpdateUser = async (idToken, type) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {
            type
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
