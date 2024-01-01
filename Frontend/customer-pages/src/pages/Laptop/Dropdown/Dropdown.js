import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Dropdown({ title, itemList, nameInput, setSelectedValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleRadio = (event) => {
        const { value, name } = event.target;

        if (nameInput === 'NOTSPEC') setSelectedValue(value);
        else {
            setSelectedValue((prevSelectedValue) => {
                const updatedValue = prevSelectedValue.map((item) =>
                    item.item1 === name ? { ...item, item2: value } : item,
                );

                if (!prevSelectedValue.some((item) => item.item1 === name)) {
                    // If there's no matching item1, add a new object to the array
                    updatedValue.push({ item1: name, item2: value });
                }

                return updatedValue;
            });
        }
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
                            <input
                                type="radio"
                                name={nameInput === 'NOTSPEC' ? title : nameInput}
                                value={nameInput === 'NOTSPEC' ? item.id : item.value} // Assuming 'item.id' is used when nameInput is 'NOTSPEC'
                                onChange={handleRadio}
                            />
                            <span className={cx('checkmark')}>{item.value}</span>
                            {/* <span className={cx('span-count')}>(12)</span> */}
                        </label>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
