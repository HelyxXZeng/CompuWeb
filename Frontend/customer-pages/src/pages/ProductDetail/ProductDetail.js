import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import { InfiSwiper } from './Swiper';

import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as productServices from '~/apiServices/productServices';

import { useShoppingCart } from '~/context/ShoppingCartContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

import config from '~/config';

const customTheme = createTheme({
    components: {
        MuiRating: {
            styleOverrides: {
                iconFilled: {
                    fontSize: '2.2rem',
                    paddingRight: '5px',
                },
                iconEmpty: {
                    fontSize: '2.2rem',
                    paddingRight: '5px',
                },
            },
        },
    },
});

const customProgressTheme = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: '8px',
                    width: '70%',
                    borderRadius: 5,
                },
                bar: {
                    borderRadius: 5,
                    backgroundColor: '#1a90ff', // Customize the bar color
                },
            },
        },
    },
});

const TruncatedTable = ({ data, displayedRows }) => {
    return (
        <table className={cx('spec-table')}>
            <tbody>
                {data?.slice(0, displayedRows).map((row, index) => (
                    <tr className={cx(index % 2 === 0 ? 'tr-0' : 'tr-1')} key={index}>
                        <td className={cx('title_charactestic')}>{row.title}</td>
                        <td className={cx('content_charactestic')}>{row.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const cx = classNames.bind(styles);

function ProductDetail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [ratingList, setRatingList] = useState([]);
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const result = await productServices.getProductVariantDetail(id);
                setProductDetail(result);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchRatingList = async () => {
            try {
                const result = await productServices.getRatingList(id);
                console.log('ratinglist', result);
                setRatingList(result);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetail();
        fetchRatingList();
    }, [id]);

    const formattedPrice = new Intl.NumberFormat('en-US').format(productDetail?.price).replace(/,/g, '.');
    const tableData = productDetail?.specifications?.map((item) => {
        return {
            title: item.item3.name,
            content: item.item2.value,
        };
    });
    const tableData1 = [
        {
            title: 'CPU (Bộ vi xử lý)',
            content:
                'Intel® Core™ i7 9850H (6 nhân 12 luồng, xung nhịp cơ bản 2.6GHz có thể đạt tối đa Turbo Boost 4.6GHz, 12 MB Intel® Smart Cache)',
        },
        {
            title: 'Ram (Bộ nhớ trong)',
            content: '16GB DDR4 bus 2666Mhz',
        },
        {
            title: 'Storage (Ổ cứng)',
            content: '512GB PCIe® NVMe™ M.2 SSD',
        },
        {
            title: 'Màn hình',
            content:
                '15.6″ UltraSharp FHD IGZO4, FHD (1920X1080) IPS, màn nhám, chống lóa, không cảm ứng, Premier Panel Guard, đổ phủ màu 100% sRGB',
        },
        {
            title: 'Card đồ họa',
            content: 'NVIDIA Quadro T1000',
        },
        {
            title: 'Pin',
            content: '6-cell, 97whr',
        },
        {
            title: 'Cổng kết nối vật lý',
            content:
                '2 cổng USB 3.1 Gen 1, 1 khe đọc-ghi thẻ SD card, 1 jack cắm tai nghe, 1 khe khóa vật lý, 1 cổng Thunderbolt 3 type C, cổng HDMI, cổng sạc chân tròn kim nhỏ',
        },
        {
            title: 'Kết nối không dây',
            content: 'Intel Dual Band Wireless AX200 2×2 + Bluetooth 5.1',
        },
        {
            title: 'Trọng lượng',
            content: '1.78kg',
        },
        {
            title: 'Màu sắc',
            content: 'Aluminum – Titan Gray (Xám bạc)',
        },
        {
            title: 'Tình trạng sản phẩm',
            content: 'Outlet/Refurbished',
        },
        {
            title: 'Bảo hành',
            content: '12 tháng tại Trung Trần',
        },
    ];

    const maxRowsToShow = tableData?.length - 5; // Set the number of rows to show initially

    const [isTableExpanded, setIsTableExpanded] = useState(false);
    const display = isTableExpanded ? tableData?.length : maxRowsToShow;

    const toggleTable = () => {
        setIsTableExpanded(!isTableExpanded);
    };

    const [value, setValue] = useState(3);

    const { increaseCartQuantity } = useShoppingCart();

    return (
        <>
            <div className={cx('top-detail')}>
                <div className={cx('product-images')}>
                    <div className={cx('prod-intro')}>
                        <h1> {productDetail ? productDetail.name : 'name'} </h1>
                        <span className={cx('subtitle')}>Fullbox - Bảo Hành 12 tháng tại Hitech</span>
                        <div className={cx('rating')}>
                            <div className={cx('stars')}>
                                <ThemeProvider theme={customTheme}>
                                    <Rating
                                        name="read-only"
                                        value={productDetail?.averageRating}
                                        readOnly
                                        precision={0.1}
                                    />
                                </ThemeProvider>
                            </div>
                            <div className={cx('total-rate')}>
                                <span>
                                    {productDetail?.averageRating} ( {productDetail?.ratingCount} đánh giá)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('images-list')}>
                        <InfiSwiper imageList={productDetail?.images} />
                    </div>
                </div>
                <div className={cx('product-action')}>
                    <div className={cx('detail-top')}>
                        <p className={cx('price')}>
                            <span className={cx('price-new')}>{formattedPrice}đ </span>
                            {/* <span className={cx('price-old')}>19.500.000đ </span> */}
                        </p>
                        <div className={cx('variant-action')}>
                            <h2>Chọn cấu hình:</h2>
                            <div className={cx('variant-list')}>
                                {productDetail?.productVariants?.map((item, index) => {
                                    const formattedPrice = new Intl.NumberFormat('en-US')
                                        .format(item.price?.value)
                                        .replace(/,/g, '.');
                                    return (
                                        <a
                                            key={index}
                                            href={`${config.routes.productDetail}/${item.id}`}
                                            className={cx('variant-item')}
                                        >
                                            <div className={cx('title')}>
                                                <p className={cx('main-title')}>{item.name}</p>
                                                <p className={cx('sub-title')}>
                                                    Fullbox - Bảo Hành 12 tháng tại Hitech
                                                </p>
                                            </div>
                                            <div className={cx('price-variant')}>
                                                <span className={cx('price-top')}>{formattedPrice}</span>
                                                {/* <span className={cx('price-bottom')}>57.000.000đ</span> */}
                                            </div>
                                        </a>
                                    );
                                })}

                                {/* 
                                <a href="/#" className={cx('variant-item')}>
                                    <div className={cx('title')}>
                                        <p className={cx('main-title')}>
                                            Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB + 1TB RTX 3070Ti 8GB 15.6inch
                                            QHD IPS 240Hz
                                        </p>
                                        <p className={cx('sub-title')}>
                                            Dell Outlet Fullbox - Bảo Hành 12 tháng tại Trung Trần
                                        </p>
                                    </div>
                                    <div className={cx('price-variant')}>
                                        <span className={cx('price-top')}>45.000.000đ</span>
                                        <span className={cx('price-bottom')}>57.000.000đ</span>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                    </div>

                    <div className={cx('endow')}>
                        <div className={cx('left-endow')}>
                            <p className={cx('title')}>
                                <span>Ưu đãi</span>
                            </p>
                            <h2>TẶNG</h2>
                            <p>
                                Gói 15 ngày bao test.
                                <br />
                                Balo Trung Trần hoặc túi chống sốc.
                                <br />
                                Chuột Không Dây.
                                <br />
                                Lót chuột.
                                <br />
                                Gói cài đặt phần mềm trọn đời.
                            </p>
                        </div>
                        <div className={cx('right-endow')}>
                            <p className={cx('title')}>
                                <span>Trợ giá</span>
                            </p>
                            <h2>
                                <strong>5%</strong>
                            </h2>
                            <p>
                                Khi mua phụ kiện.
                                <br />
                                Khi mua SSD nâng cấp thêm.
                                <br />
                                Khi nâng cấp RAM tại các Showroom của Hitech.
                            </p>
                        </div>
                    </div>

                    <div className={cx('guarantee')}>
                        <div className={cx('left-guart')}>
                            <button>
                                <img src="https://trungtran.vn/images/baohanh.png" alt="baohanh" />
                                <span>Bảo hành toàn diện</span>
                            </button>
                        </div>
                        <div className={cx('right-guart')}>
                            <button>
                                <img src="https://trungtran.vn/images/vanchuyen.png" alt="baohanh" />
                                <span>Giao hàng toàn quốc</span>
                            </button>
                        </div>
                    </div>

                    <div className={cx('buynow-installment')}>
                        <div className={cx('buynow')}>
                            <a href={config.routes.cart} onClick={() => increaseCartQuantity(id)}>
                                Mua ngay
                                <span>( Giao tận nơi hoặc nhận tại cửa hàng )</span>
                            </a>
                        </div>
                        <div className={cx('installment')}>
                            {/* <a href="/#">
                                Trả góp
                                <span>( Thủ tục nhanh chóng nhận máy ngay ) </span>
                            </a> */}
                            <button type="button" onClick={() => increaseCartQuantity(id)} name="submit_add_products">
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </div>
                    </div>

                    {/* <div className={cx('compare-addCart')}>
                        <div className={cx('compare')}>
                            <a href="/#">
                                <AddIcon className={cx('plus')} />
                                So sánh{' '}
                            </a>
                        </div>

                        <div className={cx('addCart')}>
                            <button type="button" onClick={() => increaseCartQuantity(id)} name="submit_add_products">
                                Thêm vào giỏ hàng{' '}
                            </button>
                        </div>
                    </div> */}

                    {/* <div className={cx('discount-prodList')}>
                        <h2>Khuyến mãi</h2>
                        <div className={cx('prodList')}>
                            <div className={cx('frame')}>
                                <div className={cx('check-input')}>
                                    <input type="checkbox" defaultChecked={true} name="checkbuy" />
                                </div>
                                <a href="/#">
                                    <div className={cx('prod-img')}>
                                        <img
                                            alt="Bàn phím cơ DAREU EK87 Led RGB | Brown/Blue Switch | USB | Glory "
                                            src="https://trungtran.vn/images/products/2023/resized/55368_ban_phim_co_dareu_ek87_multi_led_black_usb_rgb_red_switch_0002_3.webp"
                                        />
                                    </div>
                                    <div className={cx('prod-title')}>
                                        <h3>Bàn phím cơ DAREU EK87 Led RGB | Brown/Blue Switch | USB | Glory </h3>
                                        <div className={cx('prod-price')}>
                                            <span className={cx('price-new')}>474.050 đ </span>
                                            <span className={cx('price-old')}>499.000đ</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className={cx('frame')}>
                                <div className={cx('check-input')}>
                                    <input type="checkbox" defaultChecked={true} name="checkbuy" />
                                </div>
                                <a href="/#">
                                    <div className={cx('prod-img')}>
                                        <img
                                            alt="Chuột Gaming Logitech G102 Black RGB"
                                            src="https://trungtran.vn/images/products/2023/resized/chuot_logitech_g102_(3).webp"
                                        />
                                    </div>
                                    <div className={cx('prod-title')}>
                                        <h3>Bàn phím cơ DAREU EK87 Led RGB | Brown/Blue Switch | USB | Glory </h3>
                                        <div className={cx('prod-price')}>
                                            <span className={cx('price-new')}>474.050 đ </span>
                                            <span className={cx('price-old')}>499.000đ</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className={cx('frame')}>
                                <div className={cx('check-input')}>
                                    <input type="checkbox" defaultChecked={true} name="checkbuy" />
                                </div>
                                <a href="/#">
                                    <div className={cx('prod-img')}>
                                        <img
                                            alt="DAREU EH416 MIRROR | Tai nghe Gaming có dây LED RGB"
                                            src="https://trungtran.vn/images/products/2023/resized/tai-nghe-gaming-dareu-eh416-rgb-01.webp"
                                        />
                                    </div>
                                    <div className={cx('prod-title')}>
                                        <h3>DAREU EH416 MIRROR | Tai nghe Gaming có dây LED RGB</h3>
                                        <div className={cx('prod-price')}>
                                            <span className={cx('price-new')}>356.250 đ </span>
                                            <span className={cx('price-old')}>375.000đ</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className={cx('frame')}>
                                <div className={cx('check-input')}>
                                    <input type="checkbox" defaultChecked={true} name="checkbuy" />
                                </div>
                                <a href="/#">
                                    <div className={cx('prod-img')}>
                                        <img
                                            alt="Phích cắm chuyển đổi 3 chấu sang 2 chấu tròn"
                                            src="https://trungtran.vn/images/products/2023/resized/phich_cam_chuyen_doi.webp"
                                        />
                                    </div>
                                    <div className={cx('prod-title')}>
                                        <h3>DAREU EH416 MIRROR | Tai nghe Gaming có dây LED RGB</h3>
                                        <div className={cx('prod-price')}>
                                            <span className={cx('price-new')}>356.250 đ </span>
                                            <span className={cx('price-old')}>375.000đ</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className={cx('frame')}>
                                <div className={cx('check-input')}>
                                    <input type="checkbox" defaultChecked={true} name="checkbuy" />
                                </div>
                                <a href="/#">
                                    <div className={cx('prod-img')}>
                                        <img
                                            alt="Phích cắm chuyển đổi 3 chấu sang 2 chấu tròn"
                                            src="https://trungtran.vn/images/products/2023/resized/phich_cam_chuyen_doi.webp"
                                        />
                                    </div>
                                    <div className={cx('prod-title')}>
                                        <h3>DAREU EH416 MIRROR | Tai nghe Gaming có dây LED RGB</h3>
                                        <div className={cx('prod-price')}>
                                            <span className={cx('price-new')}>356.250 đ </span>
                                            <span className={cx('price-old')}>375.000đ</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className={cx('main-infor')}>
                <div className={cx('spec-title')}>
                    <span>Thông số kỹ thuật </span>
                </div>
                {/* <table className={cx('spec-table')}>
                    <tbody>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>CPU (Bộ vi xử lý) </td>
                            <td className={cx('content_charactestic')}>
                                Intel® Core™ i7 9850H (6 nhân 12 luồng, xung nhịp cơ bản 2.6GHz có thể đạt tối đa Turbo
                                Boost 4.6GHz, 12 MB Intel® Smart Cache){' '}
                            </td>
                        </tr>
                        <tr className={cx('tr-1')}>
                            <td className={cx('title_charactestic')}>Ram (Bộ nhớ trong) </td>
                            <td className={cx('content_charactestic')}>16GB DDR4 bus 2666Mhz </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Storage (Ổ cứng) </td>
                            <td className={cx('content_charactestic')}>512GB PCIe® NVMe™ M.2 SSD </td>
                        </tr>
                        <tr className={cx('tr-1')}>
                            <td className={cx('title_charactestic')}>Màn hình </td>
                            <td className={cx('content_charactestic')}>
                                15.6″ UltraSharp FHD IGZO4, FHD (1920X1080) IPS, màn nhám, chống lóa, không cảm ứng,
                                Premier Panel Guard, đổ phủ màu 100% sRGB{' '}
                            </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Card đồ họa </td>
                            <td className={cx('content_charactestic')}>NVIDIA Quadro T1000 </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Pin </td>
                            <td className={cx('content_charactestic')}>6-cell, 97whr </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Cổng kết nối vật lý </td>
                            <td className={cx('content_charactestic')}>
                                2 cổng USB 3.1 Gen 1, 1 khe đọc-ghi thẻ SD card, 1 jack cắm tai nghe, 1 khe khóa vật lý,
                                1 cổng Thunderbolt 3 type C, cổng HDMI, cổng sạc chân tròn kim nhỏ{' '}
                            </td>
                        </tr>
                        <tr className={cx('tr-1')}>
                            <td className={cx('title_charactestic')}>Kết nối không dây </td>
                            <td className={cx('content_charactestic')}>
                                Intel Dual Band Wireless AX200 2×2 + Bluetooth 5.1{' '}
                            </td>
                        </tr>
                        <tr className={cx('tr-1')}>
                            <td className={cx('title_charactestic')}>Trọng lượng </td>
                            <td className={cx('content_charactestic')}>1.78kg </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Màu sắc </td>
                            <td className={cx('content_charactestic')}>Aluminum – Titan Gray (Xám bạc) </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Tình trạng sản phẩm </td>
                            <td className={cx('content_charactestic')}>Outlet/Refurbished </td>
                        </tr>
                        <tr className={cx('tr-0')}>
                            <td className={cx('title_charactestic')}>Bảo hành </td>
                            <td className={cx('content_charactestic')}>12 tháng tại Trung Trần </td>
                        </tr>
                    </tbody>
                </table> */}
                <TruncatedTable data={tableData} displayedRows={display} />

                <div className={cx('see-more')} onClick={toggleTable}>
                    <span> {!isTableExpanded ? 'Xem thêm' : 'Thu gọn'} </span>
                </div>
            </div>

            <div className={cx('product-reviews')}>
                <div className={cx('reviews-title')}>
                    <span>Đánh giá sản phẩm</span>
                </div>

                <div className={cx('reviews-body')}>
                    <div className={cx('reviews-rate-box')}>
                        <div className={cx('rate-stars')}>
                            <div className={cx('text-1')}>Đánh Giá Trung Bình</div>
                            {productDetail?.averageRating > 0 ? (
                                <div className={cx('text-2')}>{productDetail?.averageRating}/5</div>
                            ) : (
                                <div className={cx('text-2')}>NaN/5</div>
                            )}
                            <div className={cx('star-list')}>
                                <ThemeProvider theme={customTheme}>
                                    <Rating
                                        name="read-only"
                                        value={productDetail?.averageRating}
                                        readOnly
                                        precision={0.1}
                                    />
                                </ThemeProvider>
                            </div>
                            <div className={cx('text-3')}>{productDetail?.ratingCount} đánh giá</div>
                        </div>
                        <div className={cx('rate-progress')}>
                            <div className={cx('five-star')}>
                                <span className={cx('text-star')}>5</span>
                                <StarIcon className={cx('custom-star')} />
                                <ThemeProvider theme={customProgressTheme}>
                                    {/* Use the customized LinearProgress component */}
                                    <LinearProgress variant="determinate" value={50} />
                                </ThemeProvider>
                                <span className={cx('text-count')}>10</span>
                            </div>
                            <div className={cx('five-star')}>
                                <span className={cx('text-star')}>4</span>
                                <StarIcon className={cx('custom-star')} />
                                <ThemeProvider theme={customProgressTheme}>
                                    {/* Use the customized LinearProgress component */}
                                    <LinearProgress variant="determinate" value={50} />
                                </ThemeProvider>
                                <span className={cx('text-count')}>10</span>
                            </div>
                            <div className={cx('five-star')}>
                                <span className={cx('text-star')}>3</span>
                                <StarIcon className={cx('custom-star')} />
                                <ThemeProvider theme={customProgressTheme}>
                                    {/* Use the customized LinearProgress component */}
                                    <LinearProgress variant="determinate" value={50} />
                                </ThemeProvider>
                                <span className={cx('text-count')}>10</span>
                            </div>
                            <div className={cx('five-star')}>
                                <span className={cx('text-star')}>2</span>
                                <StarIcon className={cx('custom-star')} />
                                <ThemeProvider theme={customProgressTheme}>
                                    {/* Use the customized LinearProgress component */}
                                    <LinearProgress variant="determinate" value={50} />
                                </ThemeProvider>
                                <span className={cx('text-count')}>10</span>
                            </div>
                            <div className={cx('five-star')}>
                                <span className={cx('text-star')}>1</span>
                                <StarIcon className={cx('custom-star')} />
                                <ThemeProvider theme={customProgressTheme}>
                                    {/* Use the customized LinearProgress component */}
                                    <LinearProgress variant="determinate" value={50} />
                                </ThemeProvider>
                                <span className={cx('text-count')}>10</span>
                            </div>
                        </div>
                        {/* <div className={cx('rate-action')}>
                            <p>Bạn đã dùng sản phẩm này?</p>
                            <a href="/#">GỬI ĐÁNH GIÁ</a>
                        </div> */}
                    </div>
                    <div className={cx('reviews-content')}>
                        <div className={cx('filter-star')}>
                            <div className={cx('filter-title')}>Lọc xem theo:</div>
                            <div className={cx('filter-list')}>
                                <div className={cx('badge')}>
                                    <span>5 sao</span>
                                </div>

                                <div className={cx('badge')}>
                                    <span>4 sao</span>
                                </div>

                                <div className={cx('badge')}>
                                    <span>3 sao</span>
                                </div>

                                <div className={cx('badge')}>
                                    <span>2 sao</span>
                                </div>

                                <div className={cx('badge')}>
                                    <span>1 sao</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-list')}>
                            {ratingList?.map((ratingItem, index) => {
                                const timestamp = ratingItem?.date;
                                const dateObject = new Date(timestamp);

                                const day = dateObject.getDate();
                                const month = dateObject.getMonth() + 1; // Months are zero-based
                                const year = dateObject.getFullYear();

                                const formattedDateTime = `${day}/${month}/${year}`;

                                const maskName = (name) => {
                                    if (!name) return null;
                                    const firstChar = name.charAt(0);
                                    const maskedPart = '*'.repeat(name.length - 1);
                                    return firstChar + maskedPart;
                                };

                                const maskedName = maskName(ratingItem?.name);

                                return (
                                    <div key={index} className={cx('content-user')}>
                                        <div className={cx('avartar')}>
                                            <PersonIcon className={cx('user-icon')} />
                                        </div>

                                        <div className={cx('infor-user')}>
                                            <div className={cx('name-user')}>
                                                <p> {maskedName}</p>
                                            </div>
                                            <div className={cx('rate-user')}>
                                                <ThemeProvider theme={customTheme}>
                                                    <Rating name="read-only" value={ratingItem?.rate} readOnly />
                                                </ThemeProvider>
                                            </div>
                                            <div className={cx('comment-user')}>
                                                <p>{ratingItem?.comment}</p>
                                            </div>
                                            <div className={cx('time-user')}>
                                                <div className={cx('time-text')}>{formattedDateTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div className={cx('content-user')}>
                                <div className={cx('avartar')}>
                                    <AccountCircleIcon />
                                </div>

                                <div className={cx('infor-user')}>
                                    <div className={cx('name-user')}>
                                        <p> Vũ Đại Phong</p>
                                    </div>
                                    <div className={cx('rate-user')}>
                                        <ThemeProvider theme={customTheme}>
                                            <Rating name="read-only" value={value} readOnly />
                                        </ThemeProvider>
                                    </div>
                                    <div className={cx('comment-user')}>
                                        <p>máy có dung lượng RAM lớn 16GB, SSD tốc độ cao, xử lý hình ảnh 3D khá tốt</p>
                                    </div>
                                    <div className={cx('time-user')}>
                                        <div className={cx('time-text')}>9 ngày trước</div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className={cx('content-user')}>
                                <div className={cx('avartar')}>
                                    <span>VP</span>
                                </div>

                                <div className={cx('infor-user')}>
                                    <div className={cx('name-user')}>
                                        <p> Vũ Phong</p>
                                    </div>
                                    <div className={cx('rate-user')}>
                                        <ThemeProvider theme={customTheme}>
                                            <Rating name="read-only" value={value} readOnly />
                                        </ThemeProvider>
                                    </div>
                                    <div className={cx('comment-user')}>
                                        <p>
                                            Máy cài đầy đủ phần mềm cần thiết, quạt có thể điều chỉnh được tốc độ tản
                                            nhiệt giúp máy máy mát nhanh, Độ bền đạt chuẩn quân đội
                                        </p>
                                    </div>
                                    <div className={cx('time-user')}>
                                        <div className={cx('time-text')}>9 ngày trước</div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('content-user')}>
                                <div className={cx('avartar')}>
                                    <span>P</span>
                                </div>

                                <div className={cx('infor-user')}>
                                    <div className={cx('name-user')}>
                                        <p> Vũ Đại Phong</p>
                                    </div>
                                    <div className={cx('rate-user')}>
                                        <ThemeProvider theme={customTheme}>
                                            <Rating name="read-only" value={value} readOnly />
                                        </ThemeProvider>
                                    </div>
                                    <div className={cx('comment-user')}>
                                        <p>
                                            laptop có màn hình chơi game&nbsp;chuyên dụng tầng số quét cao , bàn phím có
                                            tốc độ phản hồi nhanh, Card đồ hoạ mới chơi tốt các game trung bình và game
                                            nặng
                                        </p>
                                    </div>
                                    <div className={cx('time-user')}>
                                        <div className={cx('time-text')}>9 ngày trước</div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('content-user')}>
                                <div className={cx('avartar')}>
                                    <span>D</span>
                                </div>

                                <div className={cx('infor-user')}>
                                    <div className={cx('name-user')}>
                                        <p> Vũ Đại </p>
                                    </div>
                                    <div className={cx('rate-user')}>
                                        <ThemeProvider theme={customTheme}>
                                            <Rating name="read-only" value={value} readOnly />
                                        </ThemeProvider>
                                    </div>
                                    <div className={cx('comment-user')}>
                                        <p>Giao hàng nhanh, cảm ơn shop. con này chiến game cực đỉnh</p>
                                    </div>
                                    <div className={cx('time-user')}>
                                        <div className={cx('time-text')}>9 ngày trước</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className={cx('content-pagination')}></div>
                    </div>
                </div>
            </div>

            {/* <div className={cx('product-related')}>

            </div> */}
        </>
    );
}

export default ProductDetail;
