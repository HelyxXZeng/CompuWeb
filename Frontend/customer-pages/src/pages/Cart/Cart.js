import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import config from '~/config';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import CartItem from './CartItem';
import CustomeSelect from './CustomSelect';
import CustomSelectReceive from './CustomSelectReceive';
import { Link } from 'react-router-dom';

import { useShoppingCart } from '~/context/ShoppingCartContext';

import * as ProvinceOpenApi from './ApiCountry/getProvinceService';
import * as productServices from '~/apiServices/productServices';
import * as orderServices from '~/apiServices/orderServices';

const cx = classNames.bind(styles);

// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

function Cart() {
    //
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredWards, setFilteredWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    //
    const fetchProvinces = async () => {
        const result = await ProvinceOpenApi.getProvinces();
        setFilteredProvinces(result);
    };

    const fetchDistricts = async (provinceCode) => {
        const result = await ProvinceOpenApi.getDistricts(provinceCode);
        setFilteredDistricts(result.districts);
    };

    const fetchWards = async (districtCode) => {
        const result = await ProvinceOpenApi.getWards(districtCode);
        setFilteredWards(result.wards);
    };

    const loadProvinceList = async () => {
        if (!filteredProvinces.length) {
            await fetchProvinces();
        }
    };

    const loadDistrictList = async () => {
        if (filteredDistricts.length || !selectedProvince) {
            return;
        }
        await fetchDistricts(selectedProvince.code);
    };

    const loadWardList = async () => {
        if (filteredWards.length || !selectedDistrict) {
            return;
        }
        await fetchWards(selectedDistrict.code);
    };

    const selectProvince = (province) => {
        setSelectedProvince(province);
        resetDistrict();
        resetWard();
    };

    const selectDistrict = (district) => {
        setSelectedDistrict(district);
        resetWard();
    };

    const selectWard = (ward) => {
        setSelectedWard(ward);
    };

    const resetDistrict = () => {
        setSelectedDistrict(null);
        setFilteredDistricts([]);
    };

    const resetWard = () => {
        setSelectedWard(null);
        setFilteredWards([]);
    };

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

    const [sumOrder, setSumOrder] = useState(0);
    const [priceList, setPriceList] = useState([]);

    useEffect(() => {
        setPriceList([]);
        const fetchPriceList = async () => {
            try {
                const prices = await Promise.all(
                    cartItems.map(async (item) => {
                        const itemId = item.id;
                        const result = await productServices.getCartItemById(itemId);
                        const price = result?.price || 0;

                        return { itemId, price };
                    }),
                );
                setPriceList(prices);
                console.log('priceList', priceList);
                // Do something with the priceList (e.g., set it to state or log it)
                console.log('Price List:', priceList);
            } catch (error) {
                // Handle errors
                console.error('Error fetching prices:', error);
            }
        };

        // Call the function wherever needed
        fetchPriceList();
    }, []);

    useEffect(() => {
        let sum = 0; // Use let instead of const to allow updates
        const fetchCartItems = async () => {
            for (const item of cartItems) {
                const itemId = item.id;
                const result = await productServices.getCartItemById(itemId);
                sum += result?.price * item?.quantity;
            }
            const formattedSum = new Intl.NumberFormat('en-US').format(sum).replace(/,/g, '.');
            setSumOrder(formattedSum);
        };
        fetchCartItems();
    }, [cartItems]);

    const firstSum = cartItems.reduce((total, cartItem) => {
        const item = priceList.find((i) => i.itemId === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    const formattedFirstSum = new Intl.NumberFormat('en-US').format(firstSum).replace(/,/g, '.');

    const [formData, setFormData] = useState({
        gender: '1',
        name: '',
        telephone: '',
        street_address: '',
        type_address: '1',
        note: '',
        payment: '1',
        receive: '1',
        shop_address: '',
        total: '',
        customer_address: '',
    });

    formData.total = formattedFirstSum;
    const [selectedShopAddress, setSelectedShopAddress] = useState('');
    const [showTabReceive, setShowTabReceive] = useState(false);

    const handleRadioChange = (e) => {
        setShowTabReceive(e.target.value === '2');

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [errors, setErrors] = useState({
        name: '', // Initial error message for the name field
    });

    // const [gender, setGender] = useState('');
    // const [name, setName] = useState('');
    // const [telephone, setTelephone] = useState('');
    // const [address, setAddress] = useState('');
    // const [typeAddress, setTypeAddress] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    const nameInputRef = useRef(null);
    const telephoneInputRef = useRef(null);
    const streetAddressInputRef = useRef(null);
    const proviceInputRef = useRef();
    const shopAddressInputRef = useRef();

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Reset errors for all fields
        setErrors({
            name: '',
            telephone: '',
            streetAddress: '',
            // Add more fields as needed
        });

        // Validation for "Vui lòng chọn cửa hàng"
        if (showTabReceive && !selectedShopAddress) {
            console.log('shopAddressInputRef', shopAddressInputRef);
            setErrors((prevErrors) => ({ ...prevErrors, shopAddress: 'Bạn phải chọn cửa hàng' }));
            shopAddressInputRef.current.focus();
            return;
        }

        // Validation for "Họ tên"
        if (!formData.name) {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Bạn phải nhập họ tên' }));
            nameInputRef.current.focus();
            return;
        }

        // Validation for "Số điện thoại"
        const telephoneRegex = /^[0-9]{10}$/; // Exactly ten numeric digits
        if (!formData.telephone) {
            setErrors((prevErrors) => ({ ...prevErrors, telephone: 'Bạn phải nhập số điện thoại' }));
            telephoneInputRef.current.focus();
            return;
        } else if (!formData.telephone.match(/^\d+$/)) {
            setErrors((prevErrors) => ({ ...prevErrors, telephone: 'Số điện thoại không hợp lệ' }));
            telephoneInputRef.current.focus();
            return;
        } else if (!telephoneRegex.test(formData.telephone)) {
            setErrors((prevErrors) => ({ ...prevErrors, telephone: 'Số điện thoại phải là 10 số' }));
            telephoneInputRef.current.focus();
            return;
        }

        //Validation customerAddress
        if (!showTabReceive) {
            // Validation for "Tỉnh/ Thành phố"
            if (!selectedProvince) {
                setErrors((prevErrors) => ({ ...prevErrors, province: 'Bạn phải chọn Tỉnh/ Thành phố' }));

                // Focus on the input if the "Quận/ Huyện" field is not selected
                console.log('proviceInputRef', proviceInputRef);
                //proviceInputRef.current.focus();
                if (proviceInputRef.current) {
                    proviceInputRef.current.focus();
                }
                return;
            }

            // Validation for "Quận/ Huyện"
            if (!selectedDistrict) {
                setErrors((prevErrors) => ({ ...prevErrors, district: 'Bạn phải chọn Quận/ Huyện' }));

                // Focus on the input if the "Quận/ Huyện" field is not selected
                //districtInputRef.current.focus();
                return;
            }

            // Validation for "Xã/ Phường"
            if (!selectedWard) {
                setErrors((prevErrors) => ({ ...prevErrors, ward: 'Bạn phải chọn Xã/ Phường' }));

                // Focus on the input if the "Quận/ Huyện" field is not selected
                //districtInputRef.current.focus();
                return;
            }
        }

        // Validation for "Số nhà, tên đường"
        if (!formData.street_address) {
            setErrors((prevErrors) => ({ ...prevErrors, streetAddress: 'Bạn phải nhập địa chỉ chi tiết' }));

            streetAddressInputRef.current.focus();
            return;
        }

        // At this point, all validations have passed, and you can proceed to create the data object
        const currentDate = new Date(); // Create a new Date object with the current date and time
        const formattedDate = currentDate.toISOString(); // Format the date string as 'YYYY-MM-DDTHH:mm:ss.sssZ'

        // Map your array of objects to the structure expected for orderItems
        const orderItems = cartItems.map((item) => ({
            productVariantId: Number(item.id),
            quantity: item.quantity,
        }));

        //
        const customerAddress = showTabReceive
            ? ''
            : formData.street_address +
              ', ' +
              selectedWard.name +
              ', ' +
              selectedDistrict.name +
              ', ' +
              selectedProvince.name;

        formData.customer_address = customerAddress;

        const address = showTabReceive ? selectedShopAddress : customerAddress;

        formData.shop_address = selectedShopAddress;

        console.log('formData', formData);

        localStorage.setItem('formData', JSON.stringify(formData));

        try {
            const checkTel = await orderServices.checkCustomerTel(formData.telephone);

            const customer = {
                name: formData.name,
                birthdate: '2003-12-26T16:49:01.526Z',
                joinDate: formattedDate,
                phoneNumber: formData.telephone,
            };

            const customerId = checkTel || (await orderServices.createCustomer(customer));

            const orderData = {
                customerId,
                staffId: 1,
                date: formattedDate,
                note: formData.note,
                status: 'PENDING',
                address,
                orderItems,
            };

            console.log('orderData', orderData);

            await orderServices.createOrder(orderData);
            //navigate(config.routes.order);
        } catch (error) {
            console.error('Error creating order:', error);
        }
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
                                <label htmlFor="receive0" title="Giao tận nơi">
                                    <input
                                        type="radio"
                                        name="receive"
                                        id="receive0"
                                        value="1"
                                        checked={!showTabReceive}
                                        onChange={handleRadioChange}
                                    />
                                    <span className={cx('btn-type', { active: !showTabReceive })}>
                                        <LocalMallOutlinedIcon className={cx('btn-type-icon')} />
                                        Giao tận nơi
                                    </span>
                                </label>

                                <label htmlFor="receive1" title="Tại cửa hàng">
                                    <input
                                        type="radio"
                                        name="receive"
                                        value="2"
                                        id="receive1"
                                        checked={showTabReceive}
                                        onChange={handleRadioChange}
                                    />
                                    <span className={cx('btn-type', { active: showTabReceive })}>
                                        <StorefrontOutlinedIcon className={cx('btn-type-icon')} />
                                        Nhận tại cửa hàng
                                    </span>
                                </label>
                            </div>

                            {showTabReceive && (
                                <div className={cx('tab-receive')}>
                                    <div className={cx('main-tab')} ref={shopAddressInputRef}>
                                        <CustomSelectReceive
                                            selectedValue={selectedShopAddress}
                                            setSelectedValue={setSelectedShopAddress}
                                        />
                                    </div>
                                    {errors.shopAddress && (
                                        <div className={cx('shop-error-message')}>{errors.shopAddress}</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={cx('gender')}>
                            <label htmlFor="gender1">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender1"
                                    value="1"
                                    checked={formData.gender === '1'}
                                    onChange={handleInputChange}
                                />
                                <span>Anh</span>
                            </label>
                            <label htmlFor="gender0">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender0"
                                    value="2"
                                    checked={formData.gender === '2'}
                                    onChange={handleInputChange}
                                />
                                <span>Chị</span>
                            </label>
                        </div>
                        <div className={cx('main-infor')}>
                            <div className={cx('mi-col', 'col-l')}>
                                <div className={cx('mi-row', 'row-l-1')}>
                                    <p>Họ và tên *</p>
                                    <input
                                        className={cx('form-control')}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Họ và tên *"
                                        onChange={handleInputChange}
                                        required
                                        ref={nameInputRef} // Set the ref to the input element
                                    />
                                    {errors.name && <div className={cx('error-message')}>{errors.name}</div>}
                                </div>
                                <div className={cx('mi-row', 'row-l-2')}>
                                    <p>Tỉnh/ Thành phố *</p>
                                    <CustomeSelect
                                        apiData={filteredProvinces}
                                        onFocus={loadProvinceList}
                                        handleSelectApi={selectProvince}
                                        placeHolderType="Chọn Tỉnh/ Thành phố *"
                                        selectedValue={selectedProvince}
                                        setSelectedValue={setSelectedProvince}
                                        outerRef={proviceInputRef}
                                    />
                                    {errors.province && <div className={cx('error-message')}>{errors.province}</div>}
                                </div>

                                <div className={cx('mi-row', 'row-l-3')}>
                                    <p>Phường/ Xã *</p>
                                    <CustomeSelect
                                        apiData={filteredWards}
                                        onFocus={loadWardList}
                                        handleSelectApi={selectWard}
                                        placeHolderType="Chọn Phường/ Xã *"
                                        selectedValue={selectedWard}
                                        setSelectedValue={setSelectedWard}
                                    />
                                    {errors.ward && <div className={cx('error-message')}>{errors.ward}</div>}
                                </div>
                            </div>
                            <div className={cx('mi-col', 'col-r')}>
                                <div className={cx('mi-row', 'row-r-1')}>
                                    <p>Số điện thoại *</p>
                                    <input
                                        className={cx('form-control')}
                                        type="text"
                                        name="telephone"
                                        id="telephone"
                                        placeholder="Số điện thoại *"
                                        onChange={handleInputChange}
                                        ref={telephoneInputRef} // Set the ref to the input element
                                    />
                                    {errors.telephone && <div className={cx('error-message')}>{errors.telephone}</div>}
                                </div>
                                <div className={cx('mi-row', 'row-r-2')}>
                                    <p>Quận/ Huyện *</p>
                                    <CustomeSelect
                                        apiData={filteredDistricts}
                                        onFocus={loadDistrictList}
                                        handleSelectApi={selectDistrict}
                                        placeHolderType="Chọn Quận/ Huyện *"
                                        selectedValue={selectedDistrict}
                                        setSelectedValue={setSelectedDistrict}
                                    />
                                    {errors.district && <div className={cx('error-message')}>{errors.district}</div>}
                                </div>
                                <div className={cx('mi-row', 'row-r-3')}>
                                    <p>Số nhà, tên đường *</p>
                                    <input
                                        className={cx('form-control')}
                                        type="text"
                                        name="street_address"
                                        id="street_address"
                                        placeholder="Số nhà, tên đường *"
                                        onChange={handleInputChange}
                                        ref={streetAddressInputRef}
                                    />
                                    {errors.streetAddress && (
                                        <div className={cx('error-message')}>{errors.streetAddress}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('type-address')}>
                            <p>Loại địa chỉ</p>
                            <label htmlFor="type_address0">
                                <input
                                    type="radio"
                                    name="type_address"
                                    id="type_address0"
                                    value="1"
                                    checked={formData.type_address === '1'}
                                    onChange={handleInputChange}
                                />
                                <span>NHÀ RIÊNG ( giao hàng tất cả thời gian )</span>
                            </label>
                            <label htmlFor="type_address1">
                                <input
                                    type="radio"
                                    name="type_address"
                                    id="type_address1"
                                    value="2"
                                    checked={formData.type_address === '2'}
                                    onChange={handleInputChange}
                                />
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
                                onChange={handleInputChange}
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
                                    <label htmlFor="payment1">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="payment1"
                                            value="1"
                                            checked={formData.payment === '1'}
                                            onChange={handleInputChange}
                                        />
                                        <span>
                                            <AccountBalanceOutlinedIcon className={cx('pMethod-icon')} />
                                            THANH TOÁN KHI NHẬN HÀNG ( COD )
                                        </span>
                                    </label>
                                </div>
                                <div className={cx('pml-row', 'row-l-2')}>
                                    <label htmlFor="payment2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="payment2"
                                            value="2"
                                            checked={formData.payment === '2'}
                                            onChange={handleInputChange}
                                        />
                                        <span>
                                            <LocalShippingOutlinedIcon className={cx('pMethod-icon')} />
                                            CHUYỂN KHOẢN QUA NGÂN HÀNG
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('pmList-col', 'col-r')}>
                                <div className={cx('pml-row', 'row-r-1')}>
                                    <label htmlFor="payment3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="payment3"
                                            value="3"
                                            checked={formData.payment === '3'}
                                            onChange={handleInputChange}
                                        />
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
                            Tạm tính ({cartQuantity}) sản phẩm:
                            <span className={cx('total-raw')}>{formattedFirstSum}đ</span>
                        </p>
                        <p>
                            Phí vận chuyển:
                            <span>Liên hệ</span>
                        </p>
                    </div>
                    <div className={cx('payment')}>
                        <p className={cx('p-total-final')}>
                            Tổng tiền:
                            <span className={cx('total-final')}>{sumOrder}đ</span>
                        </p>
                        <div className={cx('btn-confirm-order')}>
                            <Link to="#" className={cx('btn-a')} onClick={handleFormSubmit}>
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
