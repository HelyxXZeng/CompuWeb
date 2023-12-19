import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useShoppingCart } from '~/context/ShoppingCartContext';

const cx = classNames.bind(styles);

function CartItem({ cartItem }) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const productData = {
        title: 'Alienware X15 R2 i9 12900H RAM 32GB SSD 1TB + 1TB RTX 3070Ti 8GB 15.6inch QHD IPS 240Hz',
        price: 45000000,
        image: 'https://trungtran.vn/upload_images/images/products/lenovo-legion/large/legion_5_15arp8_thumbnail.jpg',
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button className={cx('remove-cartItem-btn')} onClick={() => removeFromCart(2)}>
                    <CloseIcon className={cx('remove-icon')} />
                </button>

                <div className={cx('prod-image')}>
                    <a href="/#" title={productData.title}>
                        <img
                            src={productData.image}
                            alt="lenovo-legion-5-pro-2023-i9-rtx-4050"
                            class="img-responsive"
                        />
                    </a>

                    <div className={cx('quantity')}>
                        <span className={cx('number-span')}>
                            <button className={cx('minus-btn')} onClick={() => increaseCartQuantity(1)}>
                                <AddIcon className={cx('icon-btn')} />
                            </button>
                            <input
                                type="text"
                                name="quantity_973"
                                id="quantity_973"
                                className={cx('number-input')}
                                maxlength="5"
                                onblur="if (!window.__cfRLUnblockHandlers) return false; change_quantity(973)"
                                value={cartItem.quantity}
                            ></input>
                            <button className={cx('plus-btn')} onClick={() => decreaseCartQuantity(1)}>
                                <RemoveIcon className={cx('icon-btn')} />
                            </button>
                        </span>
                    </div>
                </div>
                <div className={cx('prod-detail')}>
                    <a className={cx('title')} href="/#">
                        {productData.title}
                    </a>

                    <div className={cx('price')}>
                        <p className={cx('price-new')}> {productData.price} </p>
                        <p className={cx('price-old')}>39.500.000đ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
