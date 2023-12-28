import classNames from 'classnames/bind';
import styles from './SearchProducts.module.scss';

import config from '~/config';

import ProducItem from '~/pages/Laptop/ProductItem';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import * as productServices from '~/apiServices/productServices';
import * as searchServices from '~/apiServices/searchServices';

import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

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

function SearchProducts() {
    const { keyword } = useParams();

    const [currentLaptopList, setCurrentLaptopList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const [laptopQuantity, setLaptopQuantity] = useState(0);

    useEffect(() => {
        const fetchLaptopList = async () => {
            try {
                const start = (currentPage - 1) * itemsPerPage + 1;
                // const result = await productServices.getLaptopTable(start, itemsPerPage);
                const result = await searchServices.search(keyword, start, itemsPerPage);

                if (result && result.item1) {
                    setCurrentLaptopList(result.item1);
                    setLaptopQuantity(result.item2);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching laptop list:', error);
            } finally {
                // Set loading to false after fetching data
                setLoading(false);
            }
        };

        // Set loading to true when initiating a new data fetch
        setLoading(true);
        fetchLaptopList();
    }, [currentPage, keyword]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={cx('breadcrumbs')}></div>

            <div className={cx('search-title')}>
                <span>
                    Có <strong style={{ color: 'red' }}>{laptopQuantity}</strong> sản phẩm với từ khóa:{' '}
                    <strong style={{ color: 'red' }}>{keyword}</strong>
                </span>
            </div>

            <div className={cx('main')}>
                <div className={cx('products-list-col')}>
                    <div className={cx('box')}>
                        {loading ? (
                            // Display loading spinner when data is still being fetched
                            // <CircularProgress className={cx('loading-spinner')} />
                            <LinearProgress className={cx('loading-spinner')} />
                        ) : currentLaptopList.length === 0 ? (
                            // Display message when there are no results
                            <div>No results found.</div>
                        ) : (
                            // Map through currentLaptopList and render ProducItem components
                            <div className={cx('row-list')}>
                                {currentLaptopList.map((product, index) => (
                                    <ProducItem key={index} item={product?.item1} />
                                ))}
                            </div>
                        )}
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

export default SearchProducts;
