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

    useEffect(() => {
        const fetchSpecList = async () => {
            const result = await productServices.getSpecList();
            setSpecList(result);
        };

        const fetchBrands = async () => {
            const result = await productServices.getBrands();
            setBrandList(result);
            console.log('Brands', brandList);
        };

        const fetchCategories = async () => {
            const result = await productServices.getCategories();
            setCateList(result);
            console.log('Categories', cateList);
        };

        fetchSpecList();
        fetchBrands();
        fetchCategories();
    }, []);
    //

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24; // Adjust the number of items per page as needed

    // Your product data
    const productList = Array(150).fill(null);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

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

                {/* <div className={cx('products-list-col')}>
                    <div className={cx('box')}>
                        <div className={cx('row-list')}>
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                            <ProducItem />
                        </div>
                    </div>
                    <div className={cx('pagination')}>
                        <Pagination count={10} color="primary" />
                    </div>
                </div> */}

                <div className={cx('products-list-col')}>
                    <div className={cx('box')}>
                        <div className={cx('row-list')}>
                            {currentItems.map((product, index) => (
                                <ProducItem key={index} /* Pass product data as props */ />
                            ))}
                        </div>
                    </div>
                    <div className={cx('pagination-wrapper')}>
                        <Pagination
                            className={cx('pagination')}
                            shape="rounded"
                            count={Math.ceil(productList.length / itemsPerPage)}
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
