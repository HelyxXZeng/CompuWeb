import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ProducItem() {
    const [isLoveActive, setLoveActive] = useState(false);

    const handleLoveClick = () => {
        setLoveActive(!isLoveActive);
    };

    return (
        <div className={cx('cell')}>
            <div className={cx('frame')}>
                <p className={cx('trending-p')}>Sản phẩm hot</p>
                <p className={cx('discount-p')}>
                    -21<span>%</span>
                </p>
                <Link to={config.routes.productDetail} className={cx('a-img')}>
                    <img
                        src="https://trungtran.vn/images/products/2023/resized/lenovo_legion_5_pro_2023_y9000p_12-copy-copy.webp"
                        alt="Lenovo Legion 5 Pro 2023 Ryzen 9 7945HX 16GB 1TB 4060 2.5K 240Hz"
                    ></img>
                </Link>
                <p className={cx('status-text')}></p>

                <a href="/#" className={cx('a-title')}>
                    Lenovo Legion 5 Pro 2023 Ryzen 9 7945HX 16GB 1TB 4060 2.5K 240Hz{' '}
                </a>
                <p className={cx('price')}>
                    33.500.000
                    <span className={cx('price-old')}>42.500.000</span>
                </p>
                <div className={cx('love-same')}>
                    <p className={cx('p-version')}>1 phiên bản</p>
                    <p className={cx('p-love')}>
                        <a href="/#" onClick={handleLoveClick}>
                            <svg
                                className={cx('svg-love', { hidden: isLoveActive })}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"></path>
                            </svg>
                            <svg
                                className={cx('svg-love-active', { hidden: !isLoveActive })}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                            </svg>
                            Yêu thích
                        </a>
                    </p>
                </div>

                <div className={cx('specification')}>
                    <p>
                        CPU: AMD Ryzen 7 7745HX
                        <br />
                        RAM: 16GB DDR5 5200MHz
                        <br />
                        Màn hình: 16.0 inch WQXGA (2560x1600) IPS, 240Hz
                        <br />
                        Đồ họa: NVIDIA®GeForce® RTX™ 4060 8GB VRAM
                    </p>
                </div>
                <div className={cx('btn-product')}>
                    <a className={cx('a-add-cart')} href="/productDetail">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"></path>
                        </svg>
                    </a>
                    <a href="/#" className={cx('a-compare')} data-id="976" data-name=" laptop" data-add="0">
                        <span>So sánh</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProducItem;
