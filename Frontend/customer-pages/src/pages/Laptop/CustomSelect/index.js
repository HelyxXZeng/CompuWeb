import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useRef, useEffect, forwardRef } from 'react';

const cx = classNames.bind(styles);

function CustomeSelect({ selectedValue, setSelectedValue }) {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const wrapperRef = useRef(null);
    useEffect(() => {
        // Function to handle clicks outside of the select box
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsActiveMenu(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const openMenu = () => {
        setIsActiveMenu(!isActiveMenu);
    };

    const handleSelect = (item) => {
        setSelectedValue(item);
        setIsActiveMenu(false); // Close the menu after selection
    };

    const filterData = [
        { id: 1, value: 'Giá thấp đến cao' },
        { id: 2, value: 'Giá cao đếp thấp' },
    ];

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('inner')}>
                <div className={cx('btn-click')} onClick={openMenu}>
                    <div className={cx('value-selected')}>
                        <input
                            id="dropdown-value"
                            type="text"
                            name="dropdown-value"
                            readonly=""
                            placeholder="Sắp xếp theo giá"
                            value={selectedValue ? selectedValue.value : ''}
                        />
                    </div>

                    <KeyboardArrowDown className={cx('icon-down', { rotate: isActiveMenu })} />
                </div>

                <div className={cx('select-menu', { 'active-menu': isActiveMenu })}>
                    <div className={cx('list-name')}>
                        <aside>
                            {filterData.map((item) => (
                                <span
                                    key={item.name}
                                    className={cx({ active: item.id === selectedValue.id })}
                                    onClick={() => handleSelect(item)}
                                >
                                    {item.value}
                                </span>
                            ))}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomeSelect;
