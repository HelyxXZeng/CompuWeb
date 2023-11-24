import classNames from 'classnames/bind';
import styles from './Laptop.module.scss';
import Dropdown from './Dropdown';
import ProducItem from './ProductItem';

import { useState } from 'react';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Adjust the number of items per page as needed

    // Your product data
    const productList = Array(68).fill(null);

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
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
                            <Dropdown />
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
