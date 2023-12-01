import { InfiSwiper } from '~/components/Swiper';
import Frame from '~/components/Frame';
import ProductItem from '~/components/ProductItem';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [isShowCompareBox, setIsShowCompareBox] = useState(false);
    const [isShowCompareBtn, setIsShowCompareBtn] = useState(true);

    const ShowCompare = () => {
        setIsShowCompareBox(true);
        setIsShowCompareBtn(false);
    };

    const CloseCompare = () => {
        setIsShowCompareBox(false);
        setIsShowCompareBtn(true);
    };

    return (
        <>
            <InfiSwiper />
            <Frame>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </Frame>
            <div className={cx('btn-compare', { 'btn-active': isShowCompareBtn })}>
                <a href="/#" title="So sánh" onClick={ShowCompare} class="btn-compare-a">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.25 0H11C10.5859 0 10.25 0.335938 10.25 0.75V4.8125H0.75C0.335938 4.8125 0 5.14844 0 5.5625V23.25C0 23.6641 0.335938 24 0.75 24H12.9951C13.4092 24 13.7451 23.6641 13.7451 23.25V19.1943H23.25C23.6641 19.1943 24 18.8584 24 18.4443V0.75C24 0.335938 23.6641 0 23.25 0ZM12.2451 22.5H1.5V14.9062H7.29614L4.88867 17.3145C4.69336 17.5098 4.69336 17.8262 4.88867 18.0215C4.98633 18.1191 5.11426 18.168 5.24219 18.168C5.37012 18.168 5.49805 18.1191 5.5957 18.0215L8.85583 14.7604C8.90222 14.7141 8.93903 14.6587 8.96448 14.5972C9.01501 14.475 9.01501 14.3375 8.96448 14.2153C8.93903 14.1538 8.90222 14.0984 8.85583 14.0521L5.5957 10.791C5.40039 10.5957 5.08398 10.5957 4.88867 10.791C4.69336 10.9863 4.69336 11.3027 4.88867 11.498L7.29614 13.9062H1.5V6.3125H10.9952C10.9969 6.3125 10.9983 6.31348 11 6.31348C11.0017 6.31348 11.0031 6.3125 11.0048 6.3125H12.2451V22.5ZM13.7451 17.6943V5.5625C13.7451 5.14844 13.4092 4.8125 12.9951 4.8125H11.75V1.5H22.5V9.09766H16.7009L19.1094 6.68848C19.3047 6.49316 19.3047 6.17676 19.1094 5.98145C18.9141 5.78613 18.5977 5.78613 18.4023 5.98145L15.1412 9.24353C15.0948 9.28979 15.058 9.34521 15.0326 9.40674C14.9821 9.52893 14.9821 9.66638 15.0326 9.78857C15.058 9.8501 15.0948 9.90552 15.1412 9.95178L18.4023 13.2139C18.5 13.3115 18.6279 13.3604 18.7559 13.3604C18.8838 13.3604 19.0117 13.3115 19.1094 13.2139C19.3047 13.0186 19.3047 12.7021 19.1094 12.5068L16.7009 10.0977H22.5V17.6943H13.7451Z"
                            fill="#20863D"
                        ></path>
                    </svg>
                    So sánh (<span id="total-compare">3</span>)
                </a>
            </div>

            <div className={cx('compare-container', { active: isShowCompareBox })}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <a href="/#" className={cx('btn-compare-less')} onClick={CloseCompare}>
                            Thu gọn <KeyboardArrowDown className={cx('icon-down')} />
                        </a>
                    </div>
                    <div className={cx('grid-container')}>
                        <div className={cx('item', 'item_add')}>
                            <CloseIcon className={cx('remove-icon')} />

                            <a
                                href="/#"
                                title='Lenovo Legion 5 2023 Ryzen 7 7735H/7735HS RAM 16GB SSD 512GB RTX 4060 15.6" 2.5K 165Hz'
                            >
                                <picture>
                                    <source
                                        srcset="https://trungtran.vn/images/products/2023/resized/legion_5_15arp8_thumbnail.jpg"
                                        type="image/webp"
                                    />
                                    <source srcset="https://trungtran.vn/images/products/2023/resized/legion_5_15arp8_thumbnail.jpg" />
                                    <img
                                        class="img-responsive lazy-loaded"
                                        data-src="https://trungtran.vn/images/products/2023/resized/legion_5_15arp8_thumbnail.jpg"
                                        width="70"
                                        height="70"
                                        alt=""
                                        src="https://trungtran.vn/images/products/2023/resized/legion_5_15arp8_thumbnail.jpg"
                                    />
                                </picture>
                                Lenovo Legion 5 2023 Ryzen 7 7735H/7735HS RAM 16GB SSD 512GB RTX 4060 15.6" 2.5K 165Hz
                            </a>
                        </div>

                        <div className={cx('item', 'item_add')}>
                            <a href="/#" data-toggle="modal" data-target="#modalCompare" title="Thêm sản phẩm">
                                <svg
                                    class="add_svg"
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="69"
                                        height="69"
                                        fill="white"
                                        stroke="#CCCCCC"
                                        stroke-dasharray="3 3"
                                    ></rect>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M36 25H34V33.999H25V35.999H34V45H36V35.999H45V33.999H36V25Z"
                                        fill="#C4C4C4"
                                    ></path>
                                </svg>
                                Thêm sản phẩm
                            </a>
                        </div>
                        <div className={cx('item', 'item_add')}>
                            <a href="/#" data-toggle="modal" data-target="#modalCompare" title="Thêm sản phẩm">
                                <svg
                                    class="add_svg"
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="69"
                                        height="69"
                                        fill="white"
                                        stroke="#CCCCCC"
                                        stroke-dasharray="3 3"
                                    ></rect>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M36 25H34V33.999H25V35.999H34V45H36V35.999H45V33.999H36V25Z"
                                        fill="#C4C4C4"
                                    ></path>
                                </svg>
                                Thêm sản phẩm
                            </a>
                        </div>
                        <div className={cx('item', 'item_add')}>
                            <a href="/#" data-toggle="modal" data-target="#modalCompare" title="Thêm sản phẩm">
                                <svg
                                    class="add_svg"
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="69"
                                        height="69"
                                        fill="white"
                                        stroke="#CCCCCC"
                                        stroke-dasharray="3 3"
                                    ></rect>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M36 25H34V33.999H25V35.999H34V45H36V35.999H45V33.999H36V25Z"
                                        fill="#C4C4C4"
                                    ></path>
                                </svg>
                                Thêm sản phẩm
                            </a>
                        </div>

                        <div className={cx('item')}>
                            <div className={cx('compare-div')}>
                                <a
                                    href="https://trungtran.vn/so-sanh/lenovo-legion-5-2023-ryzen-7-rtx-r7000-15arp8-vs-dell-inspiron-5420-i5-intel"
                                    class={cx('compare-all', 'active')}
                                >
                                    So sánh ngay
                                </a>
                                <a href="/#" className={cx('remove-all-compare')}>
                                    Xóa tất cả sản phẩm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
