import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function CustomSelectReceive({ selectedValue, setSelectedValue }) {
    // Sample array of country names
    const countryNames = ['Khu phố 6, P. Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh'];

    const [isActiveMenu, setIsActiveMenu] = useState(false);
    // const [selectedValue, setSelectedValue] = useState('Vui lòng chọn cửa hàng'); // Initial selected value
    const [searchInput, setSearchInput] = useState('');

    const inputRef = useRef(null);
    useEffect(() => {
        // Focus on the search input when the menu is opened
        if (isActiveMenu && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActiveMenu]);

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

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsActiveMenu(false); // Close the menu after selection
        setSearchInput('');
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const normalizedSearchInput = removeDiacritics(searchInput.toLowerCase());

    const filterData = countryNames.filter((name) =>
        removeDiacritics(name.toLowerCase()).includes(normalizedSearchInput),
    );

    //const filterData = countryNames.filter((name) => name.toLowerCase().includes(searchInput.toLowerCase()));

    // Now you can use the 'countries' array in your component

    // Calculate the midpoint to split the array into two parts
    const midpoint = Math.ceil(filterData.length / 2);

    // Split the array into two parts
    const firstHalf = filterData.slice(0, midpoint);
    const secondHalf = filterData.slice(midpoint);

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('inner')}>
                <div className={cx('btn-click')} onClick={openMenu}>
                    <span
                        className={cx('select2')}
                        dir="ltr"
                        data-select2-id="select2-data-1-itgl"
                        style={{ width: 'auto' }}
                    >
                        <span className={cx('selection')}>
                            <span
                                className={cx('select2-selection', 'select2-selection--single')}
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabindex="0"
                                aria-disabled="false"
                                aria-labelledby="select2-store-container"
                            >
                                <span
                                    className={cx('select2-selection-rendered')}
                                    id="select2-store-container"
                                    role="textbox"
                                    aria-readonly="true"
                                    title="Vui lòng chọn cửa hàng"
                                >
                                    {selectedValue ? selectedValue : 'Vui lòng chọn cửa hàng'}
                                </span>
                                <span className={cx('select2-selection-arrow')} role="presentation">
                                    <ArrowDropDownIcon className={cx('icon-arrow', { rotate: isActiveMenu })} />
                                </span>
                            </span>
                        </span>
                        <span class="dropdown-wrapper" aria-hidden="true"></span>
                    </span>
                </div>

                <div className={cx('select-menu', { 'active-menu': isActiveMenu })}>
                    <div className={cx('box-search')}>
                        <input ref={inputRef} placeholder="Tìm kiếm" value={searchInput} onChange={handleSearchInput} />
                    </div>
                    <div className={cx('list-name')}>
                        <aside>
                            {firstHalf.map((name) => (
                                <span
                                    key={name}
                                    className={cx({ active: name === selectedValue })}
                                    onClick={() => handleSelect(name)}
                                >
                                    {name}
                                </span>
                            ))}
                        </aside>
                        <aside>
                            {secondHalf.map((name) => (
                                <span
                                    key={name}
                                    className={cx({ active: name === selectedValue })}
                                    onClick={() => handleSelect(name)}
                                >
                                    {name}
                                </span>
                            ))}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomSelectReceive;
