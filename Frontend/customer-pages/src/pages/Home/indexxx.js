import Frame from '~/components/Frame';
import ProductItem from '~/components/ProductItem';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { useState, useEffect } from 'react';

import * as productServices from '~/apiServices/productServices';

const cx = classNames.bind(styles);

function Home() {
    //
    const [currentLaptopList, setCurrentLaptopList] = useState([]);

    useEffect(() => {
        const fetchLaptopList = async () => {
            try {
                const result = await productServices.getLaptopTable(1, 5);

                if (result && result.item1) {
                    console.log('setCurrentLaptopList', result.item1);
                    setCurrentLaptopList(result.item1);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching laptop list:', error);
            }
        };

        fetchLaptopList();
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
