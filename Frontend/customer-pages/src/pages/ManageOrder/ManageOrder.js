import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import config from '~/config';

import React, { useState, useEffect } from 'react';

import useAuth from '~/hooks/useAuth';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageOrder() {
    const { logout } = useAuth(); // Replace with your actual authentication hook
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Perform the logout operation
            await logout(); // This is your logout function from the authentication library
            console.log('Logout successful');

            // Navigate to the /account page after successful logout
            navigate('/account');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title-top')}>
                    <div className={cx('p1')}>
                        <p>
                            <span>Đơn hàng gần đây</span>
                        </p>
                    </div>
                    <div className={cx('logout')} onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>

                <div className={cx('order-list')}>
                    <div className={cx('order1')}>
                        <div className={cx('order-title')}>
                            <div className={cx('order-id')}>
                                Đơn hàng: <span>0001</span>
                            </div>
                            <div className={cx('order-status')}>Đã nhận hàng</div>
                        </div>

                        <div className={cx('order-infor')}>
                            <div className={cx('order-image')}>
                                <img
                                    src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg"
                                    alt="product-front-view-img"
                                    class="img-responsive"
                                />
                            </div>
                            <div className={cx('order-detail')}>
                                <div className={cx('prod-title')}>Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB</div>

                                <div className={cx('total')}>
                                    <p>
                                        Tổng đơn:
                                        <span> 39.500.000đ</span>
                                    </p>
                                </div>

                                <div className={cx('date')}>
                                    <p>
                                        {' '}
                                        Ngày đặt: <span>24/12/2023</span>{' '}
                                    </p>
                                </div>

                                <a className={cx('click-detail')} href="#">
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={cx('order1')}>
                        <div className={cx('order-title')}>
                            <div className={cx('order-id')}>
                                Đơn hàng: <span>0001</span>
                            </div>
                            <div className={cx('order-status')}>Đã nhận hàng</div>
                        </div>

                        <div className={cx('order-infor')}>
                            <div className={cx('order-image')}>
                                <img
                                    src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg"
                                    alt="product-front-view-img"
                                    class="img-responsive"
                                />
                            </div>
                            <div className={cx('order-detail')}>
                                <div className={cx('prod-title')}>Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB</div>

                                <div className={cx('total')}>
                                    <p>
                                        Tổng đơn:
                                        <span> 39.500.000đ</span>
                                    </p>
                                </div>

                                <div className={cx('date')}>
                                    <p>
                                        {' '}
                                        Ngày đặt: <span>24/12/2023</span>{' '}
                                    </p>
                                </div>

                                <a className={cx('click-detail')} href={config.routes.orderDetail}>
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={cx('order1')}>
                        <div className={cx('order-title')}>
                            <div className={cx('order-id')}>
                                Đơn hàng: <span>0001</span>
                            </div>
                            <div className={cx('order-status')}>Đã nhận hàng</div>
                        </div>

                        <div className={cx('order-infor')}>
                            <div className={cx('order-image')}>
                                <img
                                    src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg"
                                    alt="product-front-view-img"
                                    class="img-responsive"
                                />
                            </div>
                            <div className={cx('order-detail')}>
                                <div className={cx('prod-title')}>Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB</div>

                                <div className={cx('total')}>
                                    <p>
                                        Tổng đơn:
                                        <span> 39.500.000đ</span>
                                    </p>
                                </div>

                                <div className={cx('date')}>
                                    <p>
                                        {' '}
                                        Ngày đặt: <span>24/12/2023</span>{' '}
                                    </p>
                                </div>

                                <a className={cx('click-detail')} href={config.routes.orderDetail}>
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageOrder;
