import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../components/cards/UserCard';

const ManageUsers = () => {
    const { users } = useSelector((state) => ({...state}));

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <h3 className="text-center">Manage Users</h3>
            {users && users.map((user) => <UserCard key={user._id} user={user}/>)}
        </div>

    )
}

export default ManageUsers;