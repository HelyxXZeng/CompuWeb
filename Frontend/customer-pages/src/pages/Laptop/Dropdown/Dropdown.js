import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Dropdown({ title, itemList }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('collapse-btn')} onClick={toggleDropDown}>
                {title ? title : 'Danh mục'}
                {isOpen ? (
                    <KeyboardArrowUpIcon className={cx('icon')} />
                ) : (
                    <KeyboardArrowDownIcon className={cx('icon')} />
                )}
            </button>
            <div className={cx('collapse-list', { open: isOpen })}>
                {/* <ul className={cx('ul-list')}>
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
                </ul> */}
                {/* <ul className={cx('ul-list')}>
                    {itemList.map((item, index) => {
                        return (
                            <lable key={index} className={cx('check-box')}>
                                <input type="checkbox" />
                                <span className={cx('checkmark')}>{item.value ? item.value : item.name} </span>
                                <span className={cx('span-count')}>(12)</span>
                            </lable>
                        );
                    })}
                </ul> */}

                <ul className={cx('ul-list')}>
                    {itemList?.map((item, index) => (
                        <label key={index} className={cx('check-box')}>
                            <input type="checkbox" />
                            <span className={cx('checkmark')}>{item.value ? item.value : item.name} </span>
                            <span className={cx('span-count')}>(12)</span>
                        </label>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
