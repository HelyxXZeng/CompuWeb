import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import config from '~/config';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import CartItem from './CartItem';
import CustomeSelect from './CustomSelect';
import { Link } from 'react-router-dom';

import { useShoppingCart } from '~/context/ShoppingCartContext';

import * as ProvinceOpenApi from './ApiCountry/getProvinceService';

const cx = classNames.bind(styles);

// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

function Cart() {
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredWards, setFilteredWards] = useState([]);
    //
    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProvinceOpenApi.getProvinces();
            console.log('province', result);
            setFilteredProvinces(result);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProvinceOpenApi.getDistricts(79);
            setFilteredDistricts(result);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProvinceOpenApi.getWards(769);
            setFilteredWards(result);
        };

        fetchApi();
    }, []);
    //
    // const [cart, setCart] = useState(cartFromLocalStorage);

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);

    const { cartItems, cartQuantity } = useShoppingCart();

    const [isOpenCustomerForm, setIsOpenCustomerForm] = useState(true);
    const toggleOpenCustomerForm = () => {
        setIsOpenCustomerForm(!isOpenCustomerForm);
    };

    const [isOpenPayMethodForm, setIsOpenPayMethodForm] = useState(true);
    const toggleOpenPayMethodForm = () => {
        setIsOpenPayMethodForm(!isOpenPayMethodForm);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor-form')}>
                <div className={cx('customer-infor')}>
                    <button className={cx('collapse-btn')} onClick={toggleOpenCustomerForm}>
                        THÔNG TIN KHÁCH HÀNG
                        {isOpenCustomerForm ? (
                            <KeyboardArrowUpIcon className={cx('icon')} />
                        ) : (
                            <KeyboardArrowDownIcon className={cx('icon')} />
                        )}
                    </button>
                    <div className={cx('input-list', { open: isOpenCustomerForm })}>
                        <div className={cx('purchase-method')}>
                            <h3>Chọn cách thức mua hàng</h3>
                            <div className={cx('type-receive')}>
                                <label for="receive0" title="Giao tận nơi">
                                    <input type="radio" name="receive" id="receive0" value="1" />
                                    <span className={cx('btn-type')}>
                                        <LocalMallOutlinedIcon className={cx('btn-type-icon')} />
                                        Giao tận nơi
                                    </span>
                                </label>

                                <label for="receive1" title="Tại cửa hàng">
                                    <input type="radio" name="receive" value="2" id="receive1" />
                                    <span className={cx('btn-type')}>
                                        <StorefrontOutlinedIcon className={cx('btn-type-icon')} />
                                        Nhận tại cửa hàng
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className={cx('gender')}>
                            <label for="gender1">
                                <input type="radio" name="gender" id="gender1" value="1" checked="" />
                                <span>Anh</span>
                            </label>
                            <label for="gender0">
                                <input type="radio" name="gender" id="gender0" value="0" />
                                <span>Chị</span>
                            </label>
                        </div>
                        <div className={cx('main-infor')}>
                            <div className={cx('mi-col', 'col-l')}>
                                <div className={cx('mi-row', 'row-l-1')}>
                                    <p class="p-text-form">Họ và tên *</p>
                                    <input
                                        class={cx('form-control')}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Họ và tên *"
                                    />
                                </div>
                                <div className={cx('mi-row', 'row-l-2')}>
                                    <p class="p-text-form">Tỉnh/ Thành phố *</p>
                                    <CustomeSelect apiData={filteredProvinces} />
                                </div>

                                <div className={cx('mi-row', 'row-l-3')}>
                                    <p class="p-text-form">Phường/ Xã *</p>
                                    <CustomeSelect apiData={filteredWards.wards} />
                                </div>
                            </div>
                            <div className={cx('mi-col', 'col-r')}>
                                <div className={cx('mi-row', 'row-r-1')}>
                                    <p class="p-text-form">Số điện thoại *</p>
                                    <input
                                        className={cx('form-control')}
                                        type="text"
                                        name="telephone"
                                        id="telephone"
                                        placeholder="Số điện thoại *"
                                    />
                                </div>
                                <div className={cx('mi-row', 'row-r-2')}>
                                    <p class="p-text-form">Quận/ Huyện *</p>
                                    <CustomeSelect apiData={filteredDistricts.districts} />
                                </div>
                                <div className={cx('mi-row', 'row-r-3')}>
                                    <p class="p-text-form">Số nhà, tên đường *</p>
                                    <input
                                        class={cx('form-control')}
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Số nhà, tên đường *"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('type-address')}>
                            <p class="p-text-form">Loại địa chỉ</p>
                            <label for="type_address0">
                                <input type="radio" name="type_address" id="type_address0" value="0" checked="" />
                                <span>NHÀ RIÊNG ( giao hàng tất cả thời gian )</span>
                            </label>
                            <label for="type_address1">
                                <input type="radio" name="type_address" id="type_address1" value="1" />
                                <span>CƠ QUAN ( giao hàng giờ hành chính )</span>
                            </label>
                        </div>
                        <div className={cx('request-other')}>
                            <input
                                className={cx('note')}
                                type="text"
                                name="note"
                                id="note"
                                placeholder="Yêu cầu khác (không bắt buộc)"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('payment-method-infor')}>
                    <button className={cx('collapse-btn')} onClick={toggleOpenPayMethodForm}>
                        PHƯƠNG THỨC THANH TOÁN
                        {isOpenPayMethodForm ? (
                            <KeyboardArrowUpIcon className={cx('icon')} />
                        ) : (
                            <KeyboardArrowDownIcon className={cx('icon')} />
                        )}
                    </button>

                    <div className={cx('pMethod-content', { open: isOpenPayMethodForm })}>
                        <div className={cx('pMethod-list')}>
                            <div className={cx('pmList-col', 'col-l')}>
                                <div className={cx('pml-row', 'row-l-1')}>
                                    <label class="label_payment" for="payment2">
                                        <input type="radio" name="payment" id="payment2" value="2" />
                                        <span>
                                            <LocalShippingOutlinedIcon className={cx('pMethod-icon')} />
                                            CHUYỂN KHOẢN QUA NGÂN HÀNG
                                        </span>
                                    </label>
                                </div>
                                <div className={cx('pml-row', 'row-l-2')}>
                                    <label class="label_payment acitve" for="payment1">
                                        <input type="radio" name="payment" id="payment1" value="1" checked="" />
                                        <span>
                                            <AccountBalanceOutlinedIcon className={cx('pMethod-icon')} />
                                            THANH TOÁN KHI NHẬN HÀNG ( COD )
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('pmList-col', 'col-r')}>
                                <div className={cx('pml-row', 'row-r-1')}>
                                    <label class="label_payment" for="payment3">
                                        <input type="radio" name="payment" id="payment3" value="3" />
                                        <span>
                                            <CreditCardOutlinedIcon className={cx('pMethod-icon')} />
                                            QUẸT THẺ THANH TOÁN (VNPAY-QR)
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('products-col')}>
                <div className={cx('cartItem-content')}>
                    <h3>SẢN PHẨM ĐÃ CHỌN</h3>
                    <div className={cx('cartItem-list')}>
                        {cartItems.map((cartItem, index) => (
                            <CartItem key={index} cartItem={cartItem} />
                        ))}
                    </div>
                    <div className={cx('calculate-price')}>
                        <p>
                            Tạm tính (6) sản phẩm:
                            <span className={cx('total-raw')}>1.567.300đ</span>
                        </p>
                        <p>
                            Phí vận chuyển:
                            <span>Liên hệ</span>
                        </p>
                    </div>
                    <div className={cx('payment')}>
                        <p className={cx('p-total-final')}>
                            Tổng tiền:
                            <span className={cx('total-final')}>1.567.300đ</span>
                        </p>
                        <div className={cx('btn-confirm-order')}>
                            <Link to={config.routes.order} className={cx('btn-a')}>
                                Đặt hàng{' '}
                            </Link>

                            <p className={cx('p-text-term')}>
                                <span className={cx('span-check')}>
                                    <input type="checkbox" id="dieukhoan" name="dieukhoan" value="1" checked="true" />
                                </span>
                                <span className={cx('span-term')}>
                                    Bằng cách đặt hàng, bạn đồng ý với <a href="/#">Điều khoản sử dụng</a> của Hitech
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
