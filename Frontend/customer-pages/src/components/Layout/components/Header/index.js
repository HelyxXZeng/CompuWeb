import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import Button from '~/components/Button';
import Search from '../Search';
import { Link } from 'react-router-dom';
import HitechLogo from '~/assets/images/hitechLogo.png';
import Slogan from '~/assets/images/slogan.png';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';

import { Menu as MenuPopper } from '~/components/Popper/Menu';

const MENU_ITEMS = [
    {
        title: 'Đăng nhập',
        to: '/login',
    },
    {
        title: 'Tạo tài khoản',
        to: '/signup',
    },
];

const cx = classNames.bind(styles);

function Header() {
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('img1')} src={HitechLogo} alt="HitechLogo" />
                    <img className={cx('img2')} src={Slogan} alt="Slogan" />
                </Link>

                <div className={cx('navbar')}>
                    <Menu>
                        <MenuItem title="Giới thiệu" to={config.routes.introduce} />
                        <MenuItem title="Laptop" to={config.routes.laptop} />
                        <MenuItem title="Phụ kiện" to={config.routes.accessory} />
                        <MenuItem title="Khuyến mãi" to={config.routes.promotion} />
                    </Menu>
                </div>

                <Search className={cx('search')} />

                <div className={cx('actions')}>
                    {/* <Button primary>Log in</Button> */}
                    <button className={cx('action-btn')}>
                        <FavoriteBorderOutlinedIcon className={cx('icon')} />
                        <span className={cx('badge', 'heart')}>12</span>
                    </button>

                    <button className={cx('action-btn')}>
                        <ShoppingCartOutlinedIcon className={cx('icon')} />
                        <span className={cx('badge', 'cart')}>1</span>
                    </button>

                    <MenuPopper items={MENU_ITEMS} onChange={handleMenuChange}>
                        <button className={cx('account-btn')}>
                            <PersonOutlineOutlinedIcon className={cx('icon')} />
                        </button>
                    </MenuPopper>
                </div>
            </div>
        </header>
    );
}

export default Header;
