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
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         phoneExists(user.phoneNumber).then((exists) => {
        //             if (exists) {
        //                 // console.log('Will be authenticated')
        //                 updateAuthenticationStatus('authenticated');
        //             } else {
        //                 // console.log('Will be no-authenticated (user exist, not phone)')
        //                 updateAuthenticationStatus('no-authenticated');
        //             }
        //         });
        //     } else {
        //         // console.log('Will be no-authenticated')
        //         updateAuthenticationStatus('no-authenticated');
        //     }
        //     // console.log('This is user in AppRouter', user)
        // });

        // chỗ này lấy số điện thoại ra và gửi lên back end lấy Avatar để chèn vào hình
    }, []);

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
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="item">
                            <img alt='' className='avatar'
                                src={logo} />

                        </div>
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="item">
                            <img alt='' className='avatar'
                                src={logo} />

                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar