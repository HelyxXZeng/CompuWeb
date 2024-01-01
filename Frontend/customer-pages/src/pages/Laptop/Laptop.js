import classNames from 'classnames/bind';
import styles from './Laptop.module.scss';
import Dropdown from './Dropdown';
import ProducItem from './ProductItem';

import { useState, useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import LinearProgress from '@mui/material/LinearProgress';

import * as productServices from '~/apiServices/productServices';
import * as searchServices from '~/apiServices/searchServices';

import CustomeSelect from './CustomSelect';

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
    const [specFilter, setSpecFilter] = useState([]);
    const [brandIdFilter, setBrandIdFilter] = useState(0);
    const [categoryIdFilter, setCategoryIdFilter] = useState(0);
    const [priceRangeFilter, setPriceRangeFilter] = useState(0);
    const [lowestPriceFilter, setLowestPriceFilter] = useState(0);
    const [highestPriceFilter, setHighestPriceFilter] = useState(200000000);

    const specKeyFilterData = [
        {
            specTypeId: 1,
            name: 'RAM',
            specifications: [
                {
                    id: 0,
                    value: 'Tất cả',
                },
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
            specTypeId: 2,
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
            specTypeId: 3,
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
            specTypeId: 4,
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
            specTypeId: 5,
            name: 'Kích cỡ màn hình (inch)',
            specifications: [
                {
                    id: 1,
                    value: '13',
                },
                {
                    id: 2,
                    value: '14',
                },
                {
                    id: 3,
                    value: '15',
                },
                {
                    id: 4,
                    value: '16',
                },
            ],
        },
        {
            specTypeId: 6,
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

    const brandIdFilterData = {
        name: 'Hãng sản xuất',
        specTypeId: 'NOTSPEC',
        specifications: [
            {
                id: 0,
                value: 'Tất cả',
            },
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
    };

    const priceValueFilterData = {
        name: 'Mức giá',
        specTypeId: 'NOTSPEC',
        specifications: [
            {
                id: 0,
                value: 'Tất cả',
            },
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
    };

    const categoryIdFilterData = {
        name: 'Nhu cầu',
        specTypeId: 'NOTSPEC',
        specifications: [
            {
                id: 0,
                value: 'Tất cả',
            },
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
                value: 'Convertible',
            },
            {
                id: 5,
                value: 'Business',
            },
            {
                id: 6,
                value: 'Student',
            },
            {
                id: 7,
                value: 'Multimedia',
            },
            {
                id: 8,
                value: 'Budget',
            },
            {
                id: 9,
                value: '2-in-1',
            },
            {
                id: 10,
                value: 'Thin and Light',
            },
        ],
    };

    // console.log('specFilter', specFilter);
    // console.log('brandIdFilter', brandIdFilter);
    // console.log('categoryIdFilter', categoryIdFilter);
    // console.log('priceRangeFilter', priceRangeFilter);

    switch (priceRangeFilter) {
        case 1:
            setLowestPriceFilter(0);
            setHighestPriceFilter(10000000);
            break;
        case 2:
            setLowestPriceFilter(10000000);
            setHighestPriceFilter(20000000);
            break;
        case 3:
            setLowestPriceFilter(20000000);
            setHighestPriceFilter(30000000);
            break;
        case 4:
            setLowestPriceFilter(30000000);
            setHighestPriceFilter(200000000);
            break;
        default:
    }

    // const [specList, setSpecList] = useState([]);
    // const [brandList, setBrandList] = useState([]);
    // const [cateList, setCateList] = useState([]);
    const [currentLaptopList, setCurrentLaptopList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const [valuePriceSort, setValuePriceSort] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const [laptopQuantity, setLaptopQuantity] = useState(0);

    // useEffect(() => {
    //     const fetchLaptopList = async () => {
    //         try {
    //             const start = (currentPage - 1) * itemsPerPage + 1;
    //             const result = await productServices.getLaptopTable(start, itemsPerPage);

    //             if (result && result.item1) {
    //                 // console.log('setCurrentLaptopList', result.item1);
    //                 setCurrentLaptopList(result.item1);
    //                 setLaptopQuantity(result.item2);
    //             } else {
    //                 console.error('Invalid response format:', result);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching laptop list:', error);
    //         } finally {
    //             // Set loading to false after fetching data
    //             setLoading(false);
    //         }
    //     };
    //     // Set loading to true when initiating a new data fetch
    //     setLoading(true);
    //     fetchLaptopList();
    // }, [currentPage]);

    useEffect(() => {
        const filterLaptopList = async () => {
            try {
                const start = (currentPage - 1) * itemsPerPage + 1;
                const result = await searchServices.filter(
                    undefined,
                    start,
                    itemsPerPage,
                    brandIdFilter,
                    categoryIdFilter,
                    lowestPriceFilter,
                    highestPriceFilter,
                    specFilter,
                );

                if (result && result?.item1) {
                    console.log('filter', result.item1);
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

        setLoading(true);
        filterLaptopList();
    }, [currentPage, brandIdFilter, categoryIdFilter, lowestPriceFilter, highestPriceFilter, specFilter]);

    useEffect(() => {
        const sortLaptops = () => {
            // Create a sorted copy of the currentLaptopList based on the valuePriceSort parameter
            const sortedLaptops = [...currentLaptopList]?.sort((a, b) => {
                if (valuePriceSort?.id === 1) {
                    return a?.item1.price - b?.item1.price; // Sort from low to high price
                } else if (valuePriceSort?.id === 2) {
                    return b?.item1.price - a?.item1.price; // Sort from high to low price
                } else {
                    return 0; // No sorting
                }
            });

            // Update the state with the sorted array
            if (sortedLaptops) {
                setCurrentLaptopList(sortedLaptops);
            }
        };

        sortLaptops();
    }, [valuePriceSort]);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(pageNumber);
        setValuePriceSort('');
    };

    return (
        <>
            <div className={cx('breadcrumbs')}></div>

            <div className={cx('title')}>
                <h1>Máy tính xách tay</h1>

                <div className={cx('sorting')}>
                    <CustomeSelect selectedValue={valuePriceSort} setSelectedValue={setValuePriceSort} />
                </div>
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

                            <Dropdown
                                title={brandIdFilterData.name}
                                itemList={brandIdFilterData.specifications}
                                nameInput={brandIdFilterData.specTypeId}
                                setSelectedValue={setBrandIdFilter}
                            />
                            <Dropdown
                                title={categoryIdFilterData.name}
                                itemList={categoryIdFilterData.specifications}
                                nameInput={categoryIdFilterData.specTypeId}
                                setSelectedValue={setCategoryIdFilter}
                            />
                            <Dropdown
                                title={priceValueFilterData.name}
                                itemList={priceValueFilterData.specifications}
                                nameInput={priceValueFilterData.specTypeId}
                                setSelectedValue={setPriceRangeFilter}
                            />

                            {specKeyFilterData.map((item, index) => (
                                <Dropdown
                                    key={index}
                                    title={item.name}
                                    itemList={item.specifications}
                                    nameInput={item.specTypeId}
                                    setSelectedValue={setSpecFilter}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('products-list-col')}>
                    <div className={cx('box')}>
                        {loading ? (
                            // Display loading spinner when data is still being fetched
                            <LinearProgress className={cx('loading-spinner')} />
                        ) : (
                            <div className={cx('row-list')}>
                                {currentLaptopList?.map((product, index) => {
                                    return product && <ProducItem key={index} item={product?.item1} />;
                                })}
                            </div>
                        )}
                    </div>
                    {laptopQuantity > 0 && (
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
                    )}
                </div>
            </div>
        </>
    );
}

export default Laptop;
