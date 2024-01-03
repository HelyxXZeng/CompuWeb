import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import config from '~/config';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '~/components/Modal';
import * as orderServices from '~/apiServices/orderServices';

const cx = classNames.bind(styles);

function OrderDetail() {
    const { id: orderId } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState(false);

    const [selectedOrderItem, setSelectedOrderItem] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async (id) => {
            try {
                const res = await orderServices.getOrderDetail(id);
                console.log('res', res);
                setOrderDetail(res);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        fetchOrderDetail(orderId);
    }, [orderId]);

    const formattedTotal = new Intl.NumberFormat('en-US').format(orderDetail?.total).replace(/,/g, '.');

    const timestamp = orderDetail?.date;
    const dateObject = new Date(timestamp);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, '0'); // Ensure two-digit minutes

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    const handleOpenModal = (orderItem) => {
        setSelectedOrderItem(orderItem);
        setModalOpen(true);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title-top')}>
                        <p>
                            <span>Chi tiết đơn hàng</span>
                        </p>
                    </div>

                    <div className={cx('box-order', 'box')}>
                        <div className={cx('top-order')}>
                            <p>ĐƠN HÀNG: {orderId}</p>
                        </div>
                        <div className={cx('top-order')}>
                            <p>Trạng thái: {orderDetail?.status}</p>
                        </div>
                        <div className={cx('top-order')}>
                            <p>Tổng giá trị: {formattedTotal}đ</p>
                        </div>
                        <p className={cx('info')}>
                            <span> Ngày đặt: {formattedDateTime}</span>
                        </p>
                        {/* <p className={cx('info')}>
                            <span> Phương thức nhận hàng: </span>
                        </p> */}
                        <p className={cx('info')}>
                            <span> Địa chỉ: {orderDetail?.address}</span>
                        </p>

                        <p className={cx('info')}>
                            <span> Ghi chú đơn hàng: {orderDetail?.note}</span>
                        </p>
                    </div>

                    <div className={cx('title-infor-order')}>
                        <p>Thông tin đơn hàng</p>
                    </div>

                    <div className={cx('order-list')}>
                        {orderDetail?.variantByOrderItems?.map((orderItem, index) => {
                            const formattedPrice = new Intl.NumberFormat('en-US')
                                .format(orderItem?.price)
                                .replace(/,/g, '.');
                            // Retrieve the string from local storage
                            const storedData = JSON.parse(localStorage.getItem('orderItemRated')) || [];

                            console.log('storedData', storedData);
                            // Check if the current orderItem's orderId is in the storedData array
                            const isRatingButtonDisabled = storedData.includes(orderItem?.orderItemIds[0]);

                            return (
                                <div className={cx('order1', 'box')}>
                                    <div className={cx('order-infor')}>
                                        <div className={cx('order-image')}>
                                            <img
                                                src={
                                                    orderItem?.image ||
                                                    'https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg'
                                                }
                                                alt="product-front-view-img"
                                                class="img-responsive"
                                            />
                                        </div>
                                        <div className={cx('order-detail')}>
                                            <div className={cx('prod-title')}>{orderItem?.name}</div>

                                            <div className={cx('price')}>
                                                <p>
                                                    Giá:
                                                    <span> {formattedPrice}đ</span>
                                                </p>
                                            </div>

                                            <div className={cx('quantity')}>
                                                <p>
                                                    Số lượng:
                                                    <span> {orderItem?.quantity} </span>
                                                </p>
                                            </div>

                                            {orderDetail.status === 'COMPLETED' && (
                                                <div
                                                    className={cx('rating', { disable: isRatingButtonDisabled })}
                                                    onClick={() =>
                                                        !isRatingButtonDisabled && handleOpenModal(orderItem)
                                                    }
                                                >
                                                    {!isRatingButtonDisabled ? 'Đánh giá' : 'Đã đánh giá'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div className={cx('order1', 'box')}>
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

                                    <div className={cx('price')}>
                                        <p>
                                            Giá:
                                            <span> 39.500.000đ</span>
                                        </p>
                                    </div>

                                    <div className={cx('quantity')}>
                                        <p>
                                            Số lượng:
                                            <span> 2 </span>
                                        </p>
                                    </div>

                                    <div className={cx('rating')}>Đánh giá</div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('order1', 'box')}>
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

                                    <div className={cx('price')}>
                                        <p>
                                            Giá:
                                            <span> 39.500.000đ</span>
                                        </p>
                                    </div>

                                    <div className={cx('quantity')}>
                                        <p>
                                            Số lượng:
                                            <span> 2 </span>
                                        </p>
                                    </div>

                                    <div
                                        className={cx('rating')}
                                        onClick={() => {
                                            setModalOpen(true);
                                        }}
                                    >
                                        Đánh giá
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {modalOpen && <Modal setOpenModal={setModalOpen} selectedOrderItem={selectedOrderItem} />}
            </div>
        </>
    );
}

export default OrderDetail;
