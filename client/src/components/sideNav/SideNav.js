import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './SideNav.css';

const SideNav = () =>{

    const { user } = useSelector((state) => ({...state}));
    const history = useHistory();
    const [path, setPath] = useState("");
    
    useEffect(()=>{
        setPath(history.location.pathname);
    },[history.location.pathname]);

    return(
        <div className="col-lg-2">
            <ul className="nav flex-column">
                {/* {
                    (user && user.type==="Admin" && path==='/User/Dashboard') && user.uaoptions.map((item)=> <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                            </li>)
                } */}
                {
                    user && user.options.map((item)=> <li className="nav-item fs-6">
                                                <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                            </li>)
                }
                {/* {
                    (user && user.type==="Admin") ? (path==="/User/Dashboard") ? user.uaoptions.map((item)=> <li key={`${item}`} className="nav-item">
                                                                                                                <Link className="nav-link active" aria-current="page" to={`/User/${item}`}> {item} </Link>
                                                                                                            </li>) 
                                                                                : user.options.map((item)=> <li key={`${item}`} className="nav-item">
                                                                                                                <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                                                                                            </li>)
                    
                                                    : user.options.map((item)=> <li key={`${item}`} className="nav-item">
                                                                                    <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                                                                </li>)
                } */}
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