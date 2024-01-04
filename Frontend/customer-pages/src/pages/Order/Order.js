import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import config from '~/config';
import { useShoppingCart } from '~/context/ShoppingCartContext';

import * as productServices from '~/apiServices/productServices';

import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Order() {
    const { cartItems } = useShoppingCart();
    const [orderItems, setOrderItems] = useState([]);

    // Inside your useEffect
    // Inside your useEffect
    useEffect(() => {
        const fetchData = async () => {
            const dataPromises = cartItems.map(async (cartItem) => {
                const fetchCartItem = await productServices.getCartItemById(cartItem.id);
                return {
                    ...cartItem,
                    name: fetchCartItem?.name,
                    price: fetchCartItem?.price,
                    image: fetchCartItem?.images[0].image,
                    // Add other properties as needed
                };
            });

            const resolvedData = await Promise.all(dataPromises);
            console.log('resolvedData', resolvedData);
            setOrderItems(resolvedData);
        };

        fetchData();
    }, [cartItems]);

    // Retrieve formData from localStorage in the Order page
    const storedFormDataString = localStorage.getItem('formData');
    const storedFormData = storedFormDataString ? JSON.parse(storedFormDataString) : null;

    // Clear formData from localStorage (optional, depending on your use case)
    //localStorage.removeItem('formData');

    // Now, you can use storedFormData in your Order page
    console.log('storedFormData', storedFormData);
    const customerName = (storedFormData.gender === '1' ? 'Anh ' : 'Chị ') + storedFormData.name;
    return (
        <section className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>
                    <img
                        src=" https://trungtran.vn/modules/products/assets/images/success.svg"
                        class="img-responsive"
                        alt=""
                    />
                    <span>Đặt hàng thành công</span>
                </p>
            </div>
            <div className={cx('content')}>
                <p className={cx('p-text-thanks')}>
                    Cảm ơn <strong>{customerName}</strong> đã cho Hitech cơ hội được phục vụ
                    <br />
                    Tổng đài viên Hitech sẽ liên hệ với quý khách trong thời gian sớm nhất.
                </p>
                <div className={cx('box-order', 'box')}>
                    {/* <div className={cx('top-order')}>
                        <p>ĐƠN HÀNG: DH00000946</p>
                    </div> */}
                    <p className={cx('info')}>
                        <span> Người nhận hàng: </span>
                        {customerName}
                    </p>
                    <p className={cx('info')}>
                        <span> Số điện thoại: </span>
                        {storedFormData.telephone}
                    </p>
                    <p className={cx('info')}>
                        {storedFormData.receive === '1' ? (
                            <span>Giao đến địa chỉ: {storedFormData.customer_address}</span>
                        ) : (
                            <span>Nhận tại cửa hàng: {storedFormData.shop_address}</span>
                        )}{' '}
                        (nhân viên sẽ gọi xác nhận trước khi giao)
                    </p>
                    <p className={cx('info')}>
                        <span> Ghi chú đơn hàng: </span>
                        {storedFormData.note}
                    </p>
                </div>

                <div className={cx('title-infor-order')}>
                    <p>Thông tin đơn hàng</p>
                </div>
                <div className={cx('info-order', 'box')}>
                    <div className={cx('order-item-list')}>
                        {orderItems.map((orderItem, index) => {
                            const formattedPrice = new Intl.NumberFormat('en-US')
                                .format(orderItem?.price)
                                .replace(/,/g, '.');
                            return (
                                orderItem && (
                                    <div key={index} className={cx('order-item')}>
                                        <div className={cx('image-prod')}>
                                            <img alt="" src={orderItem?.image} />
                                        </div>
                                        <div className={cx('infor-prod')}>
                                            <div className={cx('title-prod')}>
                                                <p>{orderItem?.name}</p>
                                            </div>
                                            <div className={cx('number-prod')}>
                                                <div className={cx('quantity-prod')}>
                                                    <span>
                                                        Số lượng:{' '}
                                                        <span className={cx('quantity-span')}>
                                                            {orderItem?.quantity}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className={cx('price-prod')}>
                                                    <div className={cx('price-new')}>{formattedPrice}đ</div>
                                                    <div className={cx('price-old')}>9.990.000đ</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })}

                        {/* <div className={cx('order-item')}>
                            <div className={cx('image-prod')}>
                                <img
                                    alt=""
                                    src="https://ict-cms-prod.s3-sgn09.fptcloud.com/products/2022/12/6/00773217_638059477320471757_i_Pad_Gen_9_xam_6_a1f3135c26.jpg"
                                />
                            </div>
                            <div className={cx('infor-prod')}>
                                <div className={cx('title-prod')}>
                                    <p>
                                        Máy tính bảng iPad 10.2 2021 Wi-Fi 64GB Xám MK2K3ZA/A Máy tính bảng iPad 10.2
                                        2021 Wi-Fi 64GB Xám MK2K3ZA/AMáy tính bảng iPad 10.2 2021 Wi-Fi 64GB Xám
                                        MK2K3ZA/A
                                    </p>
                                </div>
                                <div className={cx('number-prod')}>
                                    <div className={cx('quantity-prod')}>
                                        <span>
                                            Số lượng: <span className={cx('quantity-span')}>1</span>
                                        </span>
                                    </div>
                                    <div className={cx('price-prod')}>
                                        <div className={cx('price-new')}>7.490.000đ</div>
                                        <div className={cx('price-old')}>9.990.000đ</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className={cx('price-order', 'box')}>
                    <p className={cx('price')}>
                        <span>Tạm tính : </span>
                        {storedFormData.total} đ
                    </p>
                    <p className={cx('price')}>
                        <span>Phí vận chuyển : </span>Liên hệ{' '}
                    </p>
                    <p className={cx('total-price')}>
                        <span>Tổng tiền : </span> {storedFormData.total} đ
                    </p>
                </div>
                <div className={cx('method')}>
                    <p>Phương thức thanh toán</p>
                    <span>
                        {storedFormData.payment === '1'
                            ? 'THANH TOÁN KHI NHẬN HÀNG (COD)'
                            : storedFormData.payment === '2'
                            ? 'CHUYỂN KHOẢN QUA NGÂN HÀNG'
                            : 'QUẸT THẺ THANH TOÁN (VNPAY-QR)'}
                    </span>
                </div>
            </div>
            <div className={cx('back-home')}>
                <a href={config.routes.home}>Mua thêm sản phẩm khác</a>
            </div>
        </section>
    );
}

export default Order;
