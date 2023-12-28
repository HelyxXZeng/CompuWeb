import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';

// import images from '~/assets/images';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
// import Button from '~/components/Button';
import Search from '../Search';
import { Link } from 'react-router-dom';
import HitechLogo from '~/assets/images/hitechLogo.png';
import Slogan from '~/assets/images/slogan.png';

// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
// import Badge from '@mui/material/Badge';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import { useShoppingCart } from '~/context/ShoppingCartContext';
// import { Menu as MenuPopper } from '~/components/Popper/Menu';

// const MENU_ITEMS = [
//     {
//         title: 'Đăng nhập',
//         to: '/login',
//     },
//     {
//         title: 'Tạo tài khoản',
//         to: '/signup',
//     },
// ];

const cx = classNames.bind(styles);

function Header() {
    // Handle logic
    // const handleMenuChange = (menuItem) => {
    //     switch (menuItem.type) {
    //         case 'language':
    //             // Handle change language
    //             break;
    //         default:
    //     }
    // };

    const { openCart, cartQuantity } = useShoppingCart();

    const [cartItemCount, setCartItemCount] = useState(0);

    // const handleStorageChange = (event) => {
    //     if (event.key === 'cart') {
    //         // Update your React component state with the new data from localStorage
    //         const newData = localStorage.getItem('cart');
    //         // Update your state or perform any other actions with the new data
    //         setCartItemCount(newData.length);
    //     }
    // };

    // // Add event listener for storage events
    // window.addEventListener('storage', handleStorageChange);

    useEffect(() => {
        // Function to update cart badge count
        const updateCartBadge = () => {
            const cartData = localStorage.getItem('cart');
            const cartItems = cartData ? JSON.parse(cartData) : [];
            setCartItemCount(cartItems.length);
        };

        // Initial update
        updateCartBadge();

        // Listen for changes in localStorage
        window.addEventListener('storage', updateCartBadge);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', updateCartBadge);
        };
    }, []);
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
                    {/* <MenuPopper items={MENU_ITEMS} onChange={handleMenuChange}> */}
                    {/* <button className={cx('account-btn')}>
                            
                        </button> */}

                    <Link to={config.routes.account} className={cx('account-btn')}>
                        <span>Tài khoản & Đơn hàng</span>
                    </Link>

                    {/* </MenuPopper> */}
                    {/* <a className={cx('action-btn')} href={config.routes.cart}>
                        <ShoppingCartOutlinedIcon className={cx('icon')} />
                        <span className={cx('badge', 'cart')}>1</span>
                    </a> */}

                    <a href={config.routes.cart} className={cx('cart-btn')}>
                        <div className={cx('box-cart')}>
                            <AddShoppingCartOutlinedIcon className={cx('icon')} />
                            {/* <span className={cx('badge-cart')}>{cartItemCount}</span> */}
                            <span className={cx('badge-cart')}>{cartQuantity}</span>
                        </div>
                        <span>Giỏ hàng</span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
