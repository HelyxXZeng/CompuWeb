import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LaptopIcon from '@mui/icons-material/Laptop';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';



const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <span className="logo">
                    Hitech Shop
                </span>
            </div>
            <hr></hr>
            <div className="center">
                <ul>
                    <p className="title">Main</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">Lists</p>
                    <li>
                        <PeopleIcon className='icon' />
                        <span>Users</span>
                    </li>
                    <li>
                        <LaptopIcon className='icon' />
                        <span>Products</span>
                    </li>
                    <li>
                        <CategoryIcon className='icon' />
                        <span>Categories</span>
                    </li>
                    <li>
                        <PaymentIcon className='icon' />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LoyaltyIcon className='icon' />
                        <span>Promotions</span>
                    </li>
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
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}

export default Sidebar