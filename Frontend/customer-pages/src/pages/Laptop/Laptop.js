import classNames from 'classnames/bind';
import styles from './Laptop.module.scss';
import Dropdown from './Dropdown';
import ProducItem from './ProductItem';

import { useState, useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import * as productServices from '~/apiServices/productServices';

const cx = classNames.bind(styles);

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                icon: {
                    fontSize: '2.2rem', // Adjust the font size as needed
                },
            },
        },
    },
});

function Laptop() {
    //
    const keyFilterData = [
        {
            id: 1,
            name: 'Hãng sản xuất',
            specifications: [
                {
                    id: 1,
                    value: 'Apple',
                },
                {
                    id: 2,
                    value: 'HP',
                },
                {
                    id: 3,
                    value: 'Lenovo',
                },
                {
                    id: 4,
                    value: 'Acer',
                },

                {
                    id: 5,
                    value: 'Asus',
                },
                {
                    id: 6,
                    value: 'Dell',
                },
                {
                    id: 7,
                    value: 'Microsoft',
                },
                {
                    id: 8,
                    value: 'Samsung',
                },
                {
                    id: 9,
                    value: 'Sony',
                },
                {
                    id: 10,
                    value: 'Toshiba',
                },
            ],
        },
        {
            id: 2,
            name: 'Mức giá',
            specifications: [
                {
                    id: 1,
                    value: 'Dưới 10 triệu',
                },
                {
                    id: 2,
                    value: 'Từ 10 - 20 triệu',
                },
                {
                    id: 3,
                    value: 'Từ 20 - 30 triệu',
                },
                {
                    id: 4,
                    value: 'Trên 30 triệu',
                },
            ],
        },
        {
            id: 3,
            name: 'Nhu cầu',
            specifications: [
                {
                    id: 1,
                    value: 'Gaming',
                },
                {
                    id: 2,
                    value: 'Ultrabook',
                },
                {
                    id: 3,
                    value: 'Workstation',
                },
                {
                    id: 4,
                    value: 'Business',
                },
                {
                    id: 5,
                    value: 'Student',
                },
                {
                    id: 6,
                    value: 'Thin and Light',
                },
                {
                    id: 7,
                    value: 'Khác',
                },
            ],
        },
        {
            id: 4,
            name: 'RAM',
            specifications: [
                {
                    id: 1,
                    value: '8GB',
                },
                {
                    id: 2,
                    value: '16GB',
                },
                {
                    id: 3,
                    value: '32GB',
                },
                {
                    id: 4,
                    value: '64GB',
                },
            ],
        },
        {
            id: 5,
            name: 'Ổ cứng',
            specifications: [
                {
                    id: 1,
                    value: 'SSD',
                },
                {
                    id: 2,
                    value: 'HDD',
                },
            ],
        },
        {
            id: 6,
            name: 'CPU',
            specifications: [
                {
                    id: 1,
                    value: 'Intel Core i3',
                },
                {
                    id: 2,
                    value: 'Intel Core i5',
                },
                {
                    id: 3,
                    value: 'Intel Core i7',
                },
                {
                    id: 4,
                    value: 'Intel Core i9',
                },
                {
                    id: 5,
                    value: 'AMD Ryzen 3',
                },
                {
                    id: 6,
                    value: 'AMD Ryzen 5',
                },
                {
                    id: 7,
                    value: 'AMD Ryzen 7',
                },
                {
                    id: 8,
                    value: 'AMD Ryzen 9',
                },
                {
                    id: 9,
                    value: 'Khác',
                },
            ],
        },
        {
            id: 7,
            name: 'Card đồ họa',
            specifications: [
                {
                    id: 1,
                    value: 'NVIDIA',
                },
                {
                    id: 2,
                    value: 'AMD',
                },
                {
                    id: 3,
                    value: 'Intel',
                },
            ],
        },
        {
            id: 8,
            name: 'Kích thước màn hình',
            specifications: [
                {
                    id: 1,
                    value: '< 13 inch',
                },
                {
                    id: 2,
                    value: '13-14 inch',
                },
                {
                    id: 3,
                    value: '14-15 inch',
                },
                {
                    id: 4,
                    value: '> 15 inch',
                },
            ],
        },
        {
            id: 9,
            name: 'Tấm nền màn hình',
            specifications: [
                {
                    id: 1,
                    value: 'IPS',
                },
                {
                    id: 2,
                    value: 'TN',
                },
                {
                    id: 3,
                    value: 'OLED',
                },
                {
                    id: 4,
                    value: 'Khác',
                },
            ],
        },
    ];
    // const [specList, setSpecList] = useState([]);
    // const [brandList, setBrandList] = useState([]);
    // const [cateList, setCateList] = useState([]);
    const [currentLaptopList, setCurrentLaptopList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const [laptopQuantity, setLaptopQuantity] = useState(0);

    useEffect(() => {
        const fetchLaptopList = async () => {
            try {
                const start = (currentPage - 1) * itemsPerPage + 1;
                const result = await productServices.getLaptopTable(start, itemsPerPage);

                if (result && result.item1) {
                    console.log('setCurrentLaptopList', result.item1);
                    setCurrentLaptopList(result.item1);
                    setLaptopQuantity(result.item2);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching laptop list:', error);
            }
        };

        fetchLaptopList();
    }, [currentPage]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Use Promise.all to fetch data concurrently
    //             const [specListResult, brandListResult, cateListResult] = await Promise.all([
    //                 productServices.getSpecList(),
    //                 productServices.getBrands(),
    //                 productServices.getCategories(),
    //             ]);

    //             setSpecList(specListResult);
    //             setBrandList(brandListResult);
    //             setCateList(cateListResult);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Logic to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={cx('breadcrumbs')}></div>

            <div className={cx('title')}>
                <h1>Máy tính xách tay</h1>
            </div>

            <div className={cx('filter')}></div>

            <div className={cx('main')}>
                <div className={cx('categories-col')}>
                    <div className={cx('cate-bg')}>
                        <div className={cx('cate-filter')}>
                            {/* <Dropdown /> */}
                            {/* <Dropdown title="Brand" itemList={brandList} />
                            <Dropdown title="Category" itemList={cateList} />
                            {specList.map((item, index) => {
                                return item.specifications.length > 0 ? (
                                    <Dropdown key={index} title={item.name} itemList={item.specifications} />
                                ) : null;
                            })} */}
                            {keyFilterData.map((item, index) => (
                                <Dropdown key={index} title={item.name} itemList={item.specifications} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('products-list-col')}>
                    <div className={cx('box')}>
                        <div className={cx('row-list')}>
                            {currentLaptopList.map((product, index) => (
                                <ProducItem key={index} item={product} />
                            ))}
                        </div>
                    </div>
                    <div className={cx('pagination-wrapper')}>
                        <Pagination
                            className={cx('pagination')}
                            shape="rounded"
                            count={Math.ceil(laptopQuantity / itemsPerPage)}
                            page={currentPage}
                            onChange={(event, page) => handlePageChange(page)}
                            renderItem={(item) => {
                                if (item.type === 'next' || item.type === 'previous') {
                                    return (
                                        <ThemeProvider theme={theme}>
                                            <PaginationItem {...item} />
                                        </ThemeProvider>
                                    );
                                }
                                return <PaginationItem {...item} className={cx('pagination-item')} />;
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Laptop;
