import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useShoppingCart } from '~/context/ShoppingCartContext';
import { useEffect, useState } from 'react';

import * as productServices from '~/apiServices/productServices';

import config from '~/config';

const cx = classNames.bind(styles);

function CartItem({ cartItem }) {
    const [fetchedData, setFetchedData] = useState({});

    useEffect(() => {
        const fetchCartItem = async (id) => {
            const result = await productServices.getCartItemById(id);
            setFetchedData(result);
            console.log('result', result);
        };

        fetchCartItem(cartItem.id);
    }, []);

    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    // const productData = {
    //     title: 'Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB + 1TB RTX 3070Ti 8GB 15.6inch QHD IPS 240Hz',
    //     price: 45000000,
    //     image: 'https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg',
    // };

    console.log('cartItem', cartItem);

    const formattedPrice = new Intl.NumberFormat('en-US').format(fetchedData?.price).replace(/,/g, '.');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button className={cx('remove-cartItem-btn')} onClick={() => removeFromCart(cartItem.id)}>
                    <CloseIcon className={cx('remove-icon')} />
                </button>

                <div className={cx('prod-image')}>
                    <a href={`${config.routes.productDetail}/${cartItem.id}`} title={cartItem?.result?.name}>
                        <img
                            src={fetchedData?.images ? fetchedData?.images[0].image : ''}
                            alt="product-front-view-img"
                            class="img-responsive"
                        />
                    </a>

                    <div className={cx('quantity')}>
                        <span className={cx('number-span')}>
                            <button className={cx('minus-btn')} onClick={() => increaseCartQuantity(cartItem.id)}>
                                <AddIcon className={cx('icon-btn')} />
                            </button>
                            <input
                                type="text"
                                name="quantity_973"
                                id="quantity_973"
                                className={cx('number-input')}
                                maxlength="5"
                                value={cartItem.quantity}
                            ></input>
                            <button className={cx('plus-btn')} onClick={() => decreaseCartQuantity(cartItem.id)}>
                                <RemoveIcon className={cx('icon-btn')} />
                            </button>
                        </span>
                    </div>
                </div>
                <div className={cx('prod-detail')}>
                    <a className={cx('title')} href={`${config.routes.productDetail}/${cartItem.id}`}>
                        {fetchedData?.name}
                    </a>

                    <div className={cx('price')}>
                        <p className={cx('price-new')}> {formattedPrice}đ </p>
                        {/* <p className={cx('price-old')}>39.500.000đ</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
