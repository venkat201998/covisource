import axios from 'axios';

export const createOrUpdateUser = async (idToken, type) => {
    return await axios.post(
        "http://localhost:8000/api/create-or-update-user",
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