import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const cx = classNames.bind(styles);

function CartItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button className={cx('remove-cartItem-btn')}>
                    <CloseIcon className={cx('remove-icon')} />
                </button>

                <div className={cx('prod-image')}>
                    <a
                        href="https://trungtran.vn/lenovo-legion-5-pro-2023-i9-rtx-4050/"
                        title="Lenovo Legion 5 Pro 2023 i9 13900HX RAM 16G SSD 1TB RTX 4050 2.5k 240Hz"
                    >
                        <img
                            src="https://trungtran.vn/images/products/2023/resized/lenovo_legion_5_pro_2023_y9000p_12-copy.jpg"
                            alt="lenovo-legion-5-pro-2023-i9-rtx-4050"
                            class="img-responsive"
                        />
                    </a>

                    <div className={cx('quantity')}>
                        <span className={cx('number-span')}>
                            <button className={cx('minus-btn')}>
                                <AddIcon className={cx('icon-btn')} />
                            </button>
                            <input
                                type="number"
                                name="quantity_973"
                                id="quantity_973"
                                className={cx('number-input')}
                                maxlength="5"
                                onblur="if (!window.__cfRLUnblockHandlers) return false; change_quantity(973)"
                                value="1"
                            ></input>
                            <button className={cx('plus-btn')}>
                                <RemoveIcon className={cx('icon-btn')} />
                            </button>
                        </span>
                    </div>
                </div>
                <div className={cx('prod-detail')}>
                    <a className={cx('title')} href="https://trungtran.vn/lenovo-legion-5-pro-2023-i9-rtx-4050/">
                        Lenovo Legion 5 Pro 2023 i9 13900HX RAM 16G SSD 1TB RTX 4050 2.5k 240Hz{' '}
                    </a>

                    <div className={cx('price')}>
                        <p className={cx('price-new')}>34.500.000đ </p>
                        <p className={cx('price-old')}>39.500.000đ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
