import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import config from '~/config';

import React, { useState, useEffect } from 'react';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function ManageOrder() {
    const [modalOpen, setModalOpen] = useState(false);

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
                            <p>ĐƠN HÀNG: DH00000946</p>
                        </div>
                        <div className={cx('top-order')}>
                            <p>Trạng thái: PENDING</p>
                        </div>
                        <div className={cx('top-order')}>
                            <p>Tổng giá trị: 120.000.000đ</p>
                        </div>
                        <p className={cx('info')}>
                            <span> Ngày đặt: </span>
                        </p>
                        <p className={cx('info')}>
                            <span> Phương thức nhận hàng: </span>
                        </p>
                        <p className={cx('info')}>
                            <span> Địa chỉ: </span>
                        </p>

                        <p className={cx('info')}>
                            <span> Ghi chú đơn hàng: </span>
                        </p>
                    </div>

                    <div className={cx('title-infor-order')}>
                        <p>Thông tin đơn hàng</p>
                    </div>

                    <div className={cx('order-list')}>
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
                        </div>
                    </div>
                </div>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}
            </div>
        </>
    );
}

export default ManageOrder;
