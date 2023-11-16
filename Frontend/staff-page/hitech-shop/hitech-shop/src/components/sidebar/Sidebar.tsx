import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LaptopIcon from '@mui/icons-material/Laptop';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <>
            {isSidebarOpen &&
                (
                    <>
                        <div className="sidebar">
                            <div className="top">
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <span className="logo">
                                        Hitech Shop
                                    </span>
                                </Link>

                            </div>
                            <hr></hr>
                            <div>
                                <div className="center">
                                    <ul>
                                        <p className="title">Main</p>
                                        <li>
                                            <DashboardIcon className='icon' />
                                            <span>Dashboard</span>
                                        </li>
                                        <p className="title">Lists</p>
                                        <Link to='/customers' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <PeopleIcon className='icon' />
                                                <span>Customers</span>
                                            </li>
                                        </Link>
                                        <Link to='/products' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LaptopIcon className='icon' />
                                                <span>Products</span>
                                            </li>
                                        </Link>
                                        <Link to='/productLines' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LaptopMacIcon className='icon' />
                                                <span>Product Lines</span>
                                            </li>
                                        </Link>
                                        <Link to='/categories' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <CategoryIcon className='icon' />
                                                <span>Categories</span>
                                            </li>
                                        </Link>
                                        <Link to='/brands' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <BusinessIcon className='icon' />
                                                <span>Brands</span>
                                            </li>
                                        </Link>
                                        <Link to='/orders' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <PaymentIcon className='icon' />
                                                <span>Orders</span>
                                            </li>
                                        </Link>
                                        <Link to='/promotions' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LoyaltyIcon className='icon' />
                                                <span>Promotions</span>
                                            </li>
                                        </Link>
                                        <p className="title">User</p>
                                        <li>
                                            <PersonOutlineIcon className='icon' />
                                            <span>Profile</span>
                                        </li>
                                        <li>
                                            <LogoutIcon className='icon' />
                                            <span>Log out</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                                    <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
                                </div>
                            </div>
                        </div>


                    </>
                )}
            <ReorderIcon className="toggle-button" onClick={toggleSidebar}>
                Toggle Sidebar
            </ReorderIcon>
        </>

    )
}

export default Sidebar