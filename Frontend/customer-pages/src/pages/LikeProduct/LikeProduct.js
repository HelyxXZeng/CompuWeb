import classNames from 'classnames/bind';
import styles from './LikeProduct.module.scss';
import config from '~/config';

import React, { useState, useEffect } from 'react';

import Frame from '~/components/Frame';

import * as productServices from '~/apiServices/productServices';
// import ProductItem from './ProductItem';
import ProductItem from '~/components/ProductItem';

import LinearProgress from '@mui/material/LinearProgress';

const cx = classNames.bind(styles);

function LikeProduct() {
    // Retrieve liked items from local storage

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    // Inside your useEffect
    // Inside your useEffect
    useEffect(() => {
        const likedItemsList = JSON.parse(localStorage.getItem('likeProductList')) || [];
        setProductList(likedItemsList);
        // const fetchData = async () => {
        //     try {
        //         const dataPromises = likedItemsList.map(async (id) => {
        //             const fetchProductItem = await productServices.getCartItemById(id);
        //             return fetchProductItem;
        //         });

        //         const resolvedData = await Promise.all(dataPromises);
        //         console.log('resolvedData', resolvedData);
        //         setProductList(resolvedData);
        //     } catch (error) {
        //         console.error('Error fetching liked items:', error);
        //     } finally {
        //         // Set loading to false once fetching is done
        //         setLoading(false);
        //     }
        // };

        // const fetchData = async () => {
        //     try {
        //         const dataPromises = likedItemsList.map((id) =>
        //             productServices.getCartItemById(id).catch((error) => {
        //                 console.error(`Error fetching item with id ${id}:`, error);
        //                 return null; // Return null if there was an error
        //             }),
        //         );

        //         const resolvedData = await Promise.all(dataPromises);
        //         console.log('resolvedData', resolvedData);
        //         setProductList(resolvedData.filter((item) => item !== null)); // Filter out any null values
        //     } catch (error) {
        //         console.error('Error fetching liked items:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // const fetchData = async () => {
        //     try {
        //         const dataPromises = likedItemsList.map(async (id) => {
        //             let retries = 3; // số lần thử lại
        //             while (retries > 0) {
        //                 try {
        //                     const fetchProductItem = await productServices.getCartItemById(parseInt(id, 10));
        //                     return fetchProductItem;
        //                 } catch (error) {
        //                     console.error(`Error fetching product item (retrying):`, error);
        //                     retries -= 1;
        //                 }
        //             }
        //             return null;
        //         });

        //         const resolvedData = await Promise.all(dataPromises);
        //         setProductList(resolvedData.filter((item) => item !== null));
        //     } catch (error) {
        //         console.error('Error fetching liked items:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // setLoading(true);
        // fetchData();
    }, []);

    console.log('productList', productList);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('frame-div')}>
                {/* {loading ? (
                    // Display loading spinner when data is still being fetched
                    // <CircularProgress className={cx('loading-spinner')} />
                    <LinearProgress className={cx('loading-spinner')} />
                ) : (
                    <Frame>
                        {productList?.map((product, index) => product && <ProductItem key={index} item={product} />)}
                    </Frame>
                )} */}

                <Frame>
                    {productList?.map((product, index) => product && <ProductItem key={index} item={product} />)}
                </Frame>
            </div>
        </div>
    );
}

export default LikeProduct;
