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

    const [specList, setSpecList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [cateList, setCateList] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.all to fetch data concurrently
                const [specListResult, brandListResult, cateListResult] = await Promise.all([
                    productServices.getSpecList(),
                    productServices.getBrands(),
                    productServices.getCategories(),
                ]);

                setSpecList(specListResult);
                setBrandList(brandListResult);
                setCateList(cateListResult);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                            <Dropdown title="Brand" itemList={brandList} />
                            <Dropdown title="Category" itemList={cateList} />
                            {specList.map((item, index) => {
                                return item.specifications.length > 0 ? (
                                    <Dropdown key={index} title={item.name} itemList={item.specifications} />
                                ) : null;
                            })}
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
