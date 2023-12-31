import { InfiSwiper } from '~/components/Swiper';
import Frame from '~/components/Frame';
import ProductItem from '~/components/ProductItem';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

import * as productServices from '~/apiServices/productServices';
import * as searchServices from '~/apiServices/searchServices';
import CircularProgress from '@mui/material/CircularProgress';

const cx = classNames.bind(styles);

function Home() {
    //
    // const [currentLaptopList, setCurrentLaptopList] = useState([]);

    // useEffect(() => {
    //     const fetchLaptopList = async () => {
    //         try {
    //             const result = await productServices.getLaptopTable(1, 5);

    //             if (result && result.item1) {
    //                 console.log('setCurrentLaptopList', result.item1);
    //                 setCurrentLaptopList(result.item1);
    //             } else {
    //                 console.error('Invalid response format:', result);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching laptop list:', error);
    //         }
    //     };

    //     fetchLaptopList();
    // }, []);

    const [currentLaptopList, setCurrentLaptopList] = useState([]);
    // const [appleLaptopList, setAppleLaptopList] = useState([]);
    // const [gamingLaptopList, setGamingLaptopList] = useState([]);
    // const [businessLaptopList, setBusinessLaptopList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.all to make multiple requests concurrently
                const [laptopListResult, otherDataResult] = await Promise.all([
                    productServices.getLaptopTable(50, 80),
                    // searchServices.filter(undefined, 1, 30),
                    // Add other API calls as needed
                ]);

                if (laptopListResult && laptopListResult.item1) {
                    console.log('setCurrentLaptopList', laptopListResult.item1);
                    setCurrentLaptopList(laptopListResult.item1);
                    // setAppleLaptopList(laptopListResult.slice(0, 5));
                    // setGamingLaptopList(laptopListResult.slice(10, 20));
                    // setBusinessLaptopList(laptopListResult.slice(20, 28));
                } else {
                    console.error('Invalid response format for laptopList:', laptopListResult);
                }

                // Process other data as needed
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Set loading to false after fetching data
                setLoading(false);
            }
        };

        setLoading(true);
        fetchData();
    }, []);

    // useEffect(() => {
    //     const getLaptopListByCategoryId = async (categoryId) => {
    //         try {
    //             const result = await searchServices.filter(undefined, 1, 10, 0, categoryId);

    //             if (result && result?.item1) {
    //                 console.log('result', result);
    //                 switch (categoryId) {
    //                     case 1:
    //                         setGamingLaptopList(result.item1);
    //                         break;
    //                     case 5:
    //                         setBusinessLaptopList(result.item1);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             } else {
    //                 console.error('Invalid response format:', result);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching laptop list:', error);
    //         }
    //     };

    //     const getLaptopListByBrandId = async (brandId) => {
    //         try {
    //             const result = await searchServices.filter(undefined, 1, 5, brandId);

    //             if (result && result?.item1) {
    //                 console.log('result', result);
    //                 switch (brandId) {
    //                     case 1:
    //                         setAppleLaptopList(result.item1);
    //                         console.log('result.item1', result.item1);
    //                         break;
    //                     case 2:
    //                         setHPLaptopList(result.item1);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             } else {
    //                 console.error('Invalid response format:', result);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching laptop list:', error);
    //         }
    //     };

    //     getLaptopListByBrandId(1);
    //     getLaptopListByCategoryId(5);
    //     getLaptopListByCategoryId(1);
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const businessResult = await searchServices.filter(undefined, 1, 30); // Business, categoryId: 4
    //             if (businessResult && businessResult.item1) {
    //                 setBusinessLaptopList(businessResult.item1);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    //
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
        <div className={cx('wrapper')}>
            <div className={cx('top-div')}>
                <div className={cx('banner')}>
                    <InfiSwiper />
                </div>
                {/* <div className={cx('news')}>
                    <div className={cx('bg-list-new')}>
                        <a href="/#" className={cx('item-new', 'item-new1', 'active')}>
                            <p className={cx('p-title')}>Laptop Core i3 giá bao nhiêu?</p>
                            <p className={cx('p-time')}>04/12/2023 - 8 views</p>
                        </a>
                        <a href="/#" className={cx('item-new', 'item-new2')}>
                            <p className={cx('p-title')}>Cách mở đèn bàn phím laptop Dell Core i3</p>
                            <p className={cx('p-time')}>01/12/2023 - 30 views</p>
                        </a>
                        <a href="/#" className={cx('item-new', 'item-new3')}>
                            <p className={cx('p-title')}>Sạc pin laptop gaming đúng cách giúp tăng tuổi thọ pin</p>
                            <p className={cx('p-time')}>29/11/2023 - 56 views</p>
                        </a>
                        <div className={cx('div-more')}>
                            <a className={cx('a-more')} href="/#">
                                Tất cả tin tức
                                <KeyboardArrowRightIcon className={cx('icon-arrow-right')} />
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>

            {loading ? (
                <div className={cx('circle-loading')}>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <div className={cx('frame-div')}>
                        <p className={cx('title-hotsale')}>Business </p>
                        <Frame>
                            {currentLaptopList?.slice(10, 20).map((product, index) => (
                                <ProductItem key={index} item={product} />
                            ))}
                        </Frame>
                    </div>

                    <div className={cx('frame-div')}>
                        <p className={cx('title-hotsale')}>Ultrabook</p>
                        <Frame>
                            {currentLaptopList?.slice(0, 5).map((product, index) => (
                                <ProductItem key={index} item={product} />
                            ))}
                        </Frame>
                    </div>

                    <div className={cx('frame-div')}>
                        <p className={cx('title-hotsale')}>Gaming</p>
                        <Frame>
                            {currentLaptopList?.slice(20, 30).map((product, index) => (
                                <ProductItem key={index} item={product} />
                            ))}
                        </Frame>
                    </div>
                </div>
            )}

            <div className={cx('about-hitech')}>
                <h2>Bạn Xứng Đáng Điều Tốt Nhất !</h2>
                <p className={cx('p-hitech')}>Hitech Mong Muốn Đem Lại Trải Nghiệm Tốt Nhất</p>
                <div className={cx('row-about')}>
                    <div className={cx('col-about')}>
                        <div className={cx('bao-col')}>
                            <div className={cx('bao-img')}>
                                <img alt="hitech" src="https://trungtran.vn/upload_images/images/1.png"></img>
                            </div>
                            <h3>Chất Lượng &amp; Giá Tốt</h3>
                            <p>
                                Đem đến những chiếc Laptop nhập khẩu chính hãng&nbsp;cao cấp với chất lượng dịch vụ
                                không ngừng được nâng cao.
                            </p>
                        </div>
                    </div>
                    <div className={cx('col-about')}>
                        <div className={cx('bao-col')}>
                            <div className={cx('bao-img')}>
                                <img alt="Hitech" src="https://trungtran.vn/upload_images/images/2.png"></img>
                            </div>
                            <h3>Đồng Hành</h3>
                            <p>
                                Hitech&nbsp;cung cấp dịch vụ bảo trì, bảo dưỡng tốt nhất với chi phí tối ưu cho toàn bộ
                                khách hàng, luôn song hành cùng bạn.
                            </p>
                        </div>
                    </div>
                    <div className={cx('col-about')}>
                        <div className={cx('bao-col')}>
                            <div className={cx('bao-img')}>
                                <img alt="Hitech" src="	https://trungtran.vn/upload_images/images/3.png"></img>
                            </div>
                            <h3>Thấu Hiểu &amp; Tận Tâm</h3>
                            <p>
                                Thấu hiểu được nhu cầu, nỗi bận tâm của bạn khi mua hàng công nghệ giá trị cao, Hitech
                                luôn hướng tới&nbsp;trải nghiệm tốt nhất và được nâng cấp liên tục.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('inline-number')}>
                    <div className={cx('row-inline')}>
                        <div className={cx('col-inline')}>
                            <h3>1000+</h3>
                            <p>Khách hàng tin tưởng</p>
                        </div>
                        <div className={cx('col-inline')}>
                            <h3>3&nbsp;năm+</h3>
                            <p>Trên thị trường từ 2020</p>
                        </div>
                        <div className={cx('col-inline')}>
                            <h3>1500+</h3>
                            <p>Máy đã bán</p>
                        </div>
                        <div className={cx('col-inline')}>
                            <h3>20+</h3>
                            <p>Đối tác</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className={cx('btn-compare', { 'btn-active': isShowCompareBtn })}>
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
                                <a href="/#" class={cx('compare-all', 'active')}>
                                    So sánh ngay
                                </a>
                                <a href="/#" className={cx('remove-all-compare')}>
                                    Xóa tất cả sản phẩm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Home;
