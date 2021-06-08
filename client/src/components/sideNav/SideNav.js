import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './SideNav.css';

const SideNav = () =>{

    const { user } = useSelector((state) => ({...state}));
    const history = useHistory();
    const [path, setPath] = useState("");
    
    useEffect(()=>{
        setPath(history.location.pathname);
    },[history.location.pathname]);

    return(
        <div className="col-lg-2 bgSideNav d-lg-block d-none position-fixed">
            <ul className="nav flex-column">
                {/* {
                    (user && user.type==="Admin" && path==='/User/Dashboard') && user.uaoptions.map((item)=> <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/${user.type}/${item}`}> {item} </Link>
                                            </li>)
                } */}
                {
                    user && user.options.map((item)=> item==="SlotRegistration" ? <li className="nav-item fs-6 disabledList" key={item} >
                                                                                    <NavLink className="nav-link disabledLink" aria-disabled="true" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                        {item} 
                                                                                    </NavLink>
                                                                                </li>
                                                                                : <li className="nav-item fs-6" key={item}>
                                                                                    <NavLink className="nav-link active" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                        {item} 
                                                                                    </NavLink>
                                                                                </li>
                                            )
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