import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function CustomeSelect({ apiData, onFocus, handleSelectApi, placeHolderType, selectedValue, setSelectedValue }) {
    // Sample array of country names
    // console.log('apiDta', apiData);
    // console.log('onFocus', onFocus);
    // const [apData, setApiData] = useState(apiData);
    // const countryNames = [
    //     { name: 'Thành Phố Hồ Chí Minh' },
    //     { name: 'Thành Phố Hà Nội' },
    //     { name: 'Thành Phố Đà Nẵng' },
    //     { name: 'Tỉnh An Giang' },
    //     { name: 'Tỉnh Bà Rịa - Vũng Tàu' },
    //     { name: 'Tỉnh Bắc Giang' },
    //     { name: 'Tỉnh Bắc Kạn' },
    //     { name: 'Tỉnh Bạc Liêu' },
    //     { name: 'Tỉnh Bắc Ninh' },
    //     { name: 'Tỉnh Bến Tre' },
    //     { name: 'Tỉnh Bình Định' },
    //     { name: 'Tỉnh Bình Dương' },
    //     { name: 'Tỉnh Bình Phước' },
    //     { name: 'Tỉnh Bình Thuận' },
    //     { name: 'Tỉnh Cà Mau' },
    //     { name: 'Thành Phố Cần Thơ' },
    //     { name: 'Tỉnh Cao Bằng' },
    //     { name: 'Tỉnh Đắk Lắk' },
    //     { name: 'Tỉnh Đắk Nông' },
    //     { name: 'Tỉnh Điện Biên' },
    //     { name: 'Tỉnh Đồng Nai' },
    //     { name: 'Tỉnh Đồng Tháp' },
    //     { name: 'Tỉnh Gia Lai' },
    //     { name: 'Tỉnh Hà Giang' },
    //     { name: 'Tỉnh Hà Nam' },
    //     { name: 'Tỉnh Hà Tĩnh' },
    //     { name: 'Tỉnh Hải Dương' },
    //     { name: 'Thành Phố Hải Phòng' },
    //     { name: 'Tỉnh Hậu Giang' },
    //     { name: 'Tỉnh Hòa Bình' },
    //     { name: 'Tỉnh Hưng Yên' },
    //     { name: 'Tỉnh Khánh Hòa' },
    //     { name: 'Tỉnh Kiên Giang' },
    //     { name: 'Tỉnh Kon Tum' },
    //     { name: 'Tỉnh Lai Châu' },
    //     { name: 'Tỉnh Lâm Đồng' },
    //     { name: 'Tỉnh Lạng Sơn' },
    //     { name: 'Tỉnh Lào Cai' },
    //     { name: 'Tỉnh Long An' },
    //     { name: 'Tỉnh Nam Định' },
    //     { name: 'Tỉnh Nghệ An' },
    //     { name: 'Tỉnh Ninh Bình' },
    //     { name: 'Tỉnh Ninh Thuận' },
    //     { name: 'Tỉnh Phú Thọ' },
    //     { name: 'Tỉnh Phú Yên' },
    //     { name: 'Tỉnh Quảng Bình' },
    //     { name: 'Tỉnh Quảng Nam' },
    //     { name: 'Tỉnh Quảng Ngãi' },
    //     { name: 'Tỉnh Quảng Ninh' },
    //     { name: 'Tỉnh Quảng Trị' },
    //     { name: 'Tỉnh Sóc Trăng' },
    //     { name: 'Tỉnh Sơn La' },
    //     { name: 'Tỉnh Tây Ninh' },
    //     { name: 'Tỉnh Thái Bình' },
    //     { name: 'Tỉnh Thái Nguyên' },
    //     { name: 'Tỉnh Thanh Hóa' },
    //     { name: 'Tỉnh Thừa Thiên Huế' },
    //     { name: 'Tỉnh Tiền Giang' },
    //     { name: 'Tỉnh Trà Vinh' },
    //     { name: 'Tỉnh Tuyên Quang' },
    //     { name: 'Tỉnh Vĩnh Long' },
    //     { name: 'Tỉnh Vĩnh Phúc' },
    //     { name: 'Tỉnh Yên Bái' },
    // ];

    const [isActiveMenu, setIsActiveMenu] = useState(false);
    // const [selectedValue, setSelectedValue] = useState(null); // Initial selected value
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
        setIsActiveMenu((prevIsActiveMenu) => {
            if (!prevIsActiveMenu) {
                console.log('goi api', prevIsActiveMenu);
                onFocus();
            }
            return !prevIsActiveMenu;
        });
    };

    const handleSelect = (item) => {
        setSelectedValue(item);
        setIsActiveMenu(false); // Close the menu after selection
        setSearchInput('');
        //
        handleSelectApi(item);

        //
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const normalizedSearchInput = removeDiacritics(searchInput.toLowerCase());

    // const filterData = countryNames.filter((item) =>
    //     removeDiacritics(item.toLowerCase()).includes(normalizedSearchInput),
    // );
    let filterData = [];
    if (apiData && Array.isArray(apiData)) {
        filterData = apiData.filter(
            (item) => item && item.name && removeDiacritics(item.name.toLowerCase()).includes(normalizedSearchInput),
        );

        // Use filterData as needed
    } else {
        console.error('apiData is not properly initialized or is not an array.');
    }

    //const filterData = countryNames.filter((name) => name.toLowerCase().includes(searchInput.toLowerCase()));

    // Now you can use the 'countries' array in your component

    // Calculate the midpoint to split the array into two parts
    // const midpoint = Math.ceil(filterData.length / 2);

    // Split the array into two parts
    // const firstHalf = filterData.slice(0, midpoint);
    // console.log('firstHalf', firstHalf);

    // const secondHalf = filterData.slice(midpoint);
    // console.log('secondHalf', secondHalf);

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
                            placeholder={placeHolderType}
                            title="Đà Nẵng"
                            value={selectedValue ? selectedValue.name : ''}
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
                            {filterData.map((item) => (
                                <span
                                    key={item.name}
                                    className={cx({ active: item === selectedValue })}
                                    onClick={() => handleSelect(item)}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </aside>
                        {/* <aside>
                            {firstHalf.map((item) => (
                                <span
                                    key={item.name}
                                    className={cx({ active: item.name === selectedValue })}
                                    onClick={() => handleSelect(item.name)}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </aside>
                        <aside>
                            {secondHalf.map((item) => (
                                <span
                                    key={item.name}
                                    className={cx({ active: item.name === selectedValue })}
                                    onClick={() => handleSelect(item.name)}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </aside> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomeSelect;
