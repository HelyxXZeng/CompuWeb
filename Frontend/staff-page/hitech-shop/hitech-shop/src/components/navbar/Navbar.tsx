import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import './navbar.scss';
import logo from '/src/assets/logo.png';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import staffApi from '../../api/staffApi';


const Navbar = () => {

    const { dispatch } = useContext(DarkModeContext)
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('')

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

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                staffApi.getAvatar(user.phoneNumber).then((result) => {

                    // console.log('This is result', result.data)
                    setAvatar(result.data)
                })
                // setAvatar(image)
            }
            // console.log('This is user in AppRouter', user)
        });


    }, []);

    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="items">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="item">
                            <img alt='' className='avatar'
                                src={logo} />
                        </div>
                    </Link>
                    <div className="item" onClick={() => {
                        dispatch({ type: 'TOGGLE' })
                    }}>
                        <DarkModeIcon className='icon' />
                    </div>
                    <div className="item" onClick={handleFullscreenToggle}>
                        <FullscreenExitIcon className='icon' />
                    </div>

                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="item">
                            <img alt='' className='avatar'
                                src={avatar} />
                        </div>
                    </Link>
                    <div className="item" onClick={handleLogout}>
                        <LogoutIcon className='icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar