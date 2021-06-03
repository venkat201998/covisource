import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../components/cards/UserCard';

const ManageUsers = () => {
    const { users } = useSelector((state) => ({...state}));

    return(
        <div className="col-8 offset-1  p-md-4 p-3 text-center">
            {users && users.map((user) => <UserCard key={user._id} user={user}/>)}
        </div>

    )
}

export default ManageUsers;