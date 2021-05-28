import { React } from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../components/sideNav/SideNav';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    return(
            <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    <div className="col-lg-10 col-md-8 col-sm-8 p-md-4 p-3">
                        <h3>Home Dashboard</h3>
                        <h4>{user && user.email}</h4>
                    </div>
                </div>
            </div>
    )
}

export default Home;