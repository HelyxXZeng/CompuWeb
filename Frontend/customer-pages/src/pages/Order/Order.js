import classNames from 'classnames/bind';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function order() {
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
                    Cảm ơn <strong>Anh Tam</strong> đã cho Hitech cơ hội được phục vụ
                    <br />
                    Tổng đài viên Hitech sẽ liên hệ với quý khách trong thời gian sớm nhất.
                </p>
                <div className={cx('box-order', 'box')}>
                    <div className={cx('top-order')}>
                        <p>ĐƠN HÀNG: DH00000946</p>
                    </div>
                    <p className={cx('info')}>
                        <span> Người nhận hàng: </span>Anh Tam{' '}
                    </p>
                    <p className={cx('info')}>
                        <span> Số điện thoại: </span>0977882124{' '}
                    </p>
                    <p className={cx('info')}>
                        <span> Giao đến: </span>21 fds , Mỹ Bình, Long Xuyên, An Giang (nhân viên sẽ gọi xác nhận trước
                        khi giao){' '}
                    </p>
                    <p className={cx('info')}>
                        <span> Ghi chú đơn hàng: </span>{' '}
                    </p>
                </div>

                <div className={cx('title-infor-order')}>
                    <p>Thông tin đơn hàng</p>
                </div>
                <div className={cx('info-order', 'box')}>
                    <div className={cx('order-item-list')}>
                        <div className={cx('order-item')}>
                            <div className={cx('image-prod')}>
                                <img
                                    alt=""
                                    src="https://ict-cms-prod.s3-sgn09.fptcloud.com/products/2022/12/6/00773217_638059477320471757_i_Pad_Gen_9_xam_6_a1f3135c26.jpg"
                                />
                            </div>
                            <div className={cx('infor-prod')}>
                                <div className={cx('title-prod')}>
                                    <p>Máy tính bảng iPad 10.2 2021 Wi-Fi 64GB Xám MK2K3ZA/A</p>
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
                        </div>

                        <div className={cx('order-item')}>
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
                        </div>
                    </div>
                </div>

                <div className={cx('price-order', 'box')}>
                    <p className={cx('price')}>
                        <span>Tạm tính : </span>31.067.300 đ{' '}
                    </p>
                    <p className={cx('price')}>
                        <span>Phí vận chuyển : </span>Liên hệ{' '}
                    </p>
                    <p className={cx('total-price')}>
                        <span>Tổng tiền : </span>31.067.300 đ{' '}
                    </p>
                </div>
                <div className={cx('method')}>
                    <p>Phương thức thanh toán</p>
                    <span>THANH TOÁN KHI NHẬN HÀNG ( COD )</span>
                </div>
            </div>
            <div className={cx('back-home')}>
                <a href="/#">Mua thêm sản phẩm khác</a>
            </div>
        </section>
    );
}

export default order;
