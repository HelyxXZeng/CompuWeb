import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function CustomeSelect() {
    // Sample array of country names
    const countryNames = [
        'Hồ Chí Minh',
        'Hà Nội',
        'Đà Nẵng',
        'An Giang',
        'Bà Rịa - Vũng Tàu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bạc Liêu',
        'Bắc Ninh',
        'Bến Tre',
        'Bình Định',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Cà Mau',
        'Cần Thơ',
        'Cao Bằng',
        'Đắk Lắk',
        'Đắk Nông',
        'Điện Biên',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Giang',
        'Hà Nam',
        'Hà Tĩnh',
        'Hải Dương',
        'Hải Phòng',
        'Hậu Giang',
        'Hòa Bình',
        'Hưng Yên',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Lâm Đồng',
        'Lạng Sơn',
        'Lào Cai',
        'Long An',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Phú Yên',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Tây Ninh',
        'Thái Bình',
        'Thái Nguyên',
        'Thanh Hóa',
        'Thừa Thiên Huế',
        'Tiền Giang',
        'Trà Vinh',
        'Tuyên Quang',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Yên Bái',
    ];

    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Hồ Chí Minh'); // Initial selected value
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
                    <div className={cx('value-selected')}>
                        <input
                            id="dropdown-value"
                            type="text"
                            name="dropdown-value"
                            readonly=""
                            placeholder="Chọn Tỉnh/Thành phố"
                            title="Đà Nẵng"
                            class="ant-input css-10ed4xt cursor-pointer border-0 p-0 text-base placeholder:text-base"
                            value={selectedValue}
                        />
                    </div>

                    <KeyboardArrowDown className={cx('icon-down', { rotate: isActiveMenu })} />
                </div>

                <div className={cx('select-menu', { 'active-menu': isActiveMenu })}>
                    <div className={cx('box-search')}>
                        <input
                            ref={inputRef}
                            placeholder="Nhập tỉnh, thành để tìm nhanh"
                            value={searchInput}
                            onChange={handleSearchInput}
                        />
                        <a href="/#">
                            <SearchOutlinedIcon className={cx('icon-search')} />
                        </a>
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

export default CustomeSelect;
