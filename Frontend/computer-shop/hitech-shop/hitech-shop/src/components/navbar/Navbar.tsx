import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageIcon from '@mui/icons-material/Message';
import ListIcon from '@mui/icons-material/List';


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input type='text' placeholder='Search...' />
                    <SearchIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageIcon className='icon' />
                        Language
                    </div>
                    <div className="item">
                        <DarkModeIcon className='icon' />
                    </div>
                    <div className="item">
                        <FullscreenExitIcon className='icon' />
                    </div>
                    <div className="item">
                        <NotificationsNoneIcon className='icon' />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <MessageIcon className='icon' />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListIcon className='icon' />
                    </div>
                    <div className="item">
                        <img alt='' className='avatar'
                            src='https://e1.pxfuel.com/desktop-wallpaper/587/974/desktop-wallpaper-li-xiaoye-hindi-li-xiaoye-thumbnail.jpg' />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar