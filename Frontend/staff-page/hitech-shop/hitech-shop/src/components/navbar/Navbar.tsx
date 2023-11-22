import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import './navbar.scss';
import logo from '/src/assets/logo.png';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const { dispatch } = useContext(DarkModeContext)
    const navigate = useNavigate();
    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    };

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            // Perform any additional logout actions here if needed
            navigate('/login'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='navbar'>
            <div className="wrapper">

                {/* <div className="search">
                    <input type='text' placeholder='Search...' />
                    <SearchIcon />
                </div> */}
                <div className="items">
                    {/* <div className="item">
                        <LanguageIcon className='icon' />
                        Language
                    </div> */}
                    <div className="item" onClick={() => {
                        dispatch({ type: 'TOGGLE' })
                    }}>
                        <DarkModeIcon className='icon' />
                    </div>
                    <div className="item" onClick={handleFullscreenToggle}>
                        <FullscreenExitIcon className='icon' />
                    </div>
                    <div className="item" onClick={handleLogout}>
                        <LogoutIcon className='icon' />
                    </div>
                    {/* <div className="item">
                        <NotificationsNoneIcon className='icon' />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <MessageIcon className='icon' />
                        <div className="counter">2</div>
                    </div> */}
                    {/* <div className="item">
                        <ListIcon className='icon' />
                    </div> */}
                    <div className="item">
                        <img alt='' className='avatar'
                            src={logo} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar