import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices';
import LaptopIcon from '@mui/icons-material/Laptop';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import MemoryIcon from '@mui/icons-material/Memory';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import StarIcon from '@mui/icons-material/Star';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import './sidebar.scss';

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    useEffect(() => {
        const checkScreenSize = () => {
            setIsSidebarOpen(!(window.innerWidth <= 768));
        };
        setIsSidebarOpen(!(window.innerWidth <= 768));

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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
                                        {/* <p className="title">Products</p> */}
                                        <Link to='/categories' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <CategoryIcon className='icon' />
                                                <span>Categories</span>
                                            </li>
                                        </Link>
                                        <Link to='/products' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LaptopIcon className='icon' />
                                                <span>Product Overview</span>
                                            </li>
                                        </Link>
                                        <Link to='/productLines' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LaptopMacIcon className='icon' />
                                                <span>Product Lines</span>
                                            </li>
                                        </Link>
                                        <Link to='/productVariants' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <DevicesIcon className='icon' />
                                                <span>Product Variants</span>
                                            </li>
                                        </Link>
                                        <Link to='/productInstances' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <LooksOneIcon className='icon' />
                                                <span>Product Instances</span>
                                            </li>
                                        </Link>
                                        <Link to='/prices' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <AttachMoneyIcon className='icon' />
                                                <span>Prices</span>
                                            </li>
                                        </Link>
                                        <Link to='/specificationTypes' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <AssignmentIcon className='icon' />
                                                <span>Specification Types</span>
                                            </li>
                                        </Link>
                                        <Link to='/specifications' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <MemoryIcon className='icon' />
                                                <span>Specifications</span>
                                            </li>
                                        </Link>
                                        {/* <p className="title">Sales</p> */}
                                        <Link to='/customers' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <PeopleIcon className='icon' />
                                                <span>Customers</span>
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
                                        <Link to='/ratings' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <StarIcon className='icon' />
                                                <span>Rating</span>
                                            </li>
                                        </Link>
                                        <Link to='/returns' style={{ textDecoration: 'none' }}>
                                            <li>
                                                <AssignmentReturnIcon className='icon' />
                                                <span>Return</span>
                                            </li>
                                        </Link>
                                        {/* <p className="title">Functions</p>
                                        <li onClick={handleLogout}>
                                            <LogoutIcon className='icon' />
                                            <span>Log out</span>
                                        </li> */}
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

            <div className="toggle-button" onClick={toggleSidebar}>
                &#9776; {/* Hamburger menu icon */}
            </div>

        </>

    )
}

export default Sidebar