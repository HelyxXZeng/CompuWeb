import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function SearchItem({ item }) {
    const formattedPrice = new Intl.NumberFormat('en-US').format(item.price).replace(/,/g, '.');

    return (
        <Link to={`${config.routes.productDetail}/${item.id}`} className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={
                    item.images[0]
                        ? item.images[0].image
                        : 'https://trungtran.vn/images/products/2023/resized/lenovo_legion_5_pro_2023_y9000p_12-copy-copy.webp'
                }
                alt="front view of laptop"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{item.name}</span>
                </h4>
                <span className={cx('username')}>{formattedPrice}</span>
            </div>
        </Link>
    );
}

export default SearchItem;
