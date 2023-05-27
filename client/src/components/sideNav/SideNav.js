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

    let uaoptions = ['Dashboard', 'SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'];

    return(
        <div className="col-lg-2 bgSideNav d-lg-block d-none position-fixed">
            <ul className="nav flex-column">
                {
                    user && user.type === 'Admin' && path.includes('/Admin/') ? user.options.map((item)=> item==="SlotRegistration" ? <li className="nav-item fs-6 disabledList" key={item} >
                                                                                                                                            <NavLink className="nav-link disabledLink" aria-disabled="true" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                {item} 
                                                                                                                                            </NavLink>
                                                                                                                                        </li>
                                                                                                                                    :   <li className="nav-item fs-6" key={item}>
                                                                                                                                                <NavLink className="nav-link active" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                    {item} 
                                                                                                                                                </NavLink>
                                                                                                                                        </li>)
                                                                            : uaoptions.map((item) => item==="SlotRegistration" ? <li className="nav-item fs-6 disabledList" key={item} >
                                                                                                                                    <NavLink className="nav-link disabledLink" aria-disabled="true" aria-current="page" to={`/User/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                        {item} 
                                                                                                                                    </NavLink>
                                                                                                                                </li>
                                                                                                                                :   <li className="nav-item fs-6" key={item}>
                                                                                                                                            <NavLink className="nav-link active" aria-current="page" to={`/User/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                {item} 
                                                                                                                                            </NavLink>
                                                                                                                                    </li>)
                }
            </ul>
        </div>
    )
}
export default SideNav;