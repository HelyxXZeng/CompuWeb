import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('collapse-btn')} onClick={toggleDropDown}>
                Danh mục
                {isOpen ? (
                    <KeyboardArrowUpIcon className={cx('icon')} />
                ) : (
                    <KeyboardArrowDownIcon className={cx('icon')} />
                )}
            </button>
            <div className={cx('collapse-list', { open: isOpen })}>
                {/* <ul className={cx('ul-list')}>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                    <li>
                        <a href="https://trungtran.vn/acer/">Acer </a>
                        <span>(23)</span>
                    </li>
                </ul> */}
                <ul className={cx('ul-list')}>
                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>Dưới 10 triệu </span>
                        <span className={cx('span-count')}>(12)</span>
                    </lable>
                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>10 - 15 triệu </span>
                        <span className={cx('span-count')}>(12)</span>
                    </lable>
                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>15 - 20 triệu </span>
                        <span className={cx('span-count')}>(12)</span>
                    </lable>
                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>20 - 25 triệu </span>
                        <span className={cx('span-count')}>(12)</span>
                    </lable>
                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>25 - 30 triệu </span>
                        <span className={cx('span-count')}>(123)</span>
                    </lable>

                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>30 - 40 triệu </span>
                        <span className={cx('span-count')}>(123)</span>
                    </lable>

                    <lable className={cx('check-box')}>
                        <input type="checkbox" />
                        <span className={cx('checkmark')}>Trên 40 triệu </span>
                        <span className={cx('span-count')}>(123)</span>
                    </lable>
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
