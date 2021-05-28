import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideNav = () =>{

    const { user } = useSelector((state) => ({...state}));

    return(
        <div className="col-lg-2">
            <ul className="nav flex-column">
                {
                    user && user.options.map((item)=> <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                            </li>
                )
                }
                {/* <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Hospital</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Hospitals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">User</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Users</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Password</Link>
                </li> */}
            </ul>
        </div>
    )
}
export default SideNav;