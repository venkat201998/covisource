import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../components/cards/UserCard';

const ManageUsers = () => {
    const { users } = useSelector((state) => ({...state}));

    const [ firstName, setFirstName ] = useState("");

    const handleSearchUser = (e) => {
        e.preventDefault();
        setFirstName(e.target.value);
    }

    const capitalize = (s) => {
        return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    };

    const searchUser = (firstName) => (c) => c && c.firstName.includes(capitalize(firstName));

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <div className="row justify-content-center mx-lg-4 mx-md-0 mx-1">
                <div className="col-md-6 col-12 text-center text-md-start p-0">
                    <h3>Manage Users</h3>
                </div>
                <div className="col-md-6 col-12 p-0">
                    <input type="search" placeholder="User FirstName" value={firstName} onChange={handleSearchUser} className="form-control"/>
                </div>
            </div>
            {users && users.filter(searchUser(firstName)).map((user) => <UserCard key={user._id} user={user}/>)}
        </div>

    )
}

export default ManageUsers;