import Frame from '~/components/Frame';
import ProductItem from '~/components/ProductItem';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { useState, useEffect } from 'react';

import * as productServices from '~/apiServices/productServices';

const cx = classNames.bind(styles);

function Home() {
    const [currentLaptopList, setCurrentLaptopList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.all to make multiple requests concurrently
                const [laptopListResult, otherDataResult] = await Promise.all([
                    productServices.getLaptopTable(1, 5),
                    // Add other API calls as needed
                ]);

                if (laptopListResult && laptopListResult.item1) {
                    console.log('setCurrentLaptopList', laptopListResult.item1);
                    setCurrentLaptopList(laptopListResult.item1);
                } else {
                    console.error('Invalid response format for laptopList:', laptopListResult);
                }

                // Process other data as needed
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={cx('frame-div')}>
                <p className={cx('title-hotsale')}>HOT SALE</p>
                <Frame>
                    {currentLaptopList.map((product, index) => (
                        <ProductItem key={index} item={product} />
                    ))}
                </Frame>
            </div>
        </>
    );
}

export default Home;
