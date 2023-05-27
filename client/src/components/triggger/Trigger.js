import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './Trigger.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Trigger = () => {

    const { user } = useSelector((state) => ({...state}));
    const history = useHistory();
    const [path, setPath] = useState("");
    
    useEffect(()=>{
        setPath(history.location.pathname);
    },[history.location.pathname]);

    let uaoptions = ['Dashboard', 'SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'];

    return(
        <div className="Trigger d-lg-none d-sm-block">
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    theme="light"                
                >
                    { history.location.pathname === '/' ?
                    <Menu theme="light" mode="vertical" defaultSelectedKeys={[]}>
                        <Menu.Item key="1" style={{height: 50}}>
                            <div className="row">
                                <div className="col-2 text-end">
                                    <span><i class="fa fa-phone-volume fs-4"></i></span>
                                </div>
                                <div className="col-10">
                                    <h6 className="fw-bold fs-6">Number</h6>
                                    <h6 className="contacts">9700960964</h6>
                                </div>
                            </div>
                        </Menu.Item>
                        
                        <Menu.Item key="2" style={{height: 50}}>
                            <div className="row p-1">
                                <div className="col-2 text-end">
                                    <span><i class="fa fa-user-headset fs-4"></i></span>
                                </div>
                                <div className="col-10">
                                    <h6 className="fw-bold fs-6">Health Ministry</h6>
                                    <h6 className="contacts">9700960964</h6>
                                </div>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="3" style={{height: 50}}>
                            <div className="row p-1">
                                <div className="col-2 text-end">
                                    <span><i class="fa fa-child fs-4"></i></span>
                                </div>
                                <div className="col-10">
                                    <h6 className="fw-bold fs-6">Child</h6>
                                    <h6 className="contacts">9700960964</h6>
                                </div>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="4" style={{height: 50}}>
                            <div className="row p-1">
                                <div className="col-2 text-end">
                                    <span><i class="fa fa-head-side-medical fs-4"></i></span>
                                </div>
                                <div className="col-10">
                                    <h6 className="fw-bold fs-6">Mental Health</h6>
                                    <h6 className="contacts">9700960964</h6>
                                </div>
                            </div>
                        </Menu.Item>
                    </Menu> :
                    <Menu theme="light" mode="vertical" defaultSelectedKeys={[]}>
                        { 

                            user && user.type === 'Admin' && path.includes('/Admin/') ? user.options.map((item)=> item==="SlotRegistration" ? <Menu.Item className="nav-item fs-6 disabledList p-0" key={item} style={{height: 50}} >
                                                                                                                                                <NavLink className="nav-link disabledLink" aria-disabled="true" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                    {item} 
                                                                                                                                                </NavLink>
                                                                                                                                            </Menu.Item>
                                                                                                                                            : <Menu.Item className="nav-item fs-6 p-0" key={item} style={{height: 50}}>
                                                                                                                                                <NavLink className="nav-link active" aria-current="page" to={`/${user.type}/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                    {item} 
                                                                                                                                                </NavLink>
                                                                                                                                            </Menu.Item>)
                                                                                        : uaoptions.map((item) => item==="SlotRegistration" ?  <Menu.Item className="nav-item fs-6 disabledList p-0" key={item} style={{height: 50}} >
                                                                                                                                                <NavLink className="nav-link disabledLink" aria-disabled="true" aria-current="page" to={`/User/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                    {item} 
                                                                                                                                                </NavLink>
                                                                                                                                            </Menu.Item>
                                                                                                                                            : <Menu.Item className="nav-item fs-6 p-0" key={item} style={{height: 50}} >
                                                                                                                                                <NavLink className="nav-link active" aria-current="page" to={`/User/${item}`} activeStyle={{color: '#fff', background: '#0c3f57'}}>
                                                                                                                                                    {item} 
                                                                                                                                                </NavLink>
                                                                                                                                            </Menu.Item>)
                        }
                    </Menu>
                }
                </Sider>
            </Layout>
        </div>
      );
}

export default Trigger;