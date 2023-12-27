import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from '~/components/SearchItem';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import * as searchServices from '~/apiServices/searchServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef, forwardRef } from 'react';
import { useDebounce } from '~/hooks';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook from React Router

import config from '~/config';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const navigate = useNavigate(); // Get the history object from React Router
    const handleSearchResult = () => {
        // Set the search URL
        const searchUrl = `${config.routes.search}/${debounced}`;

        // Reload the page
        window.location.href = searchUrl;
        // window.location.reload();
        // navigate(searchUrl);
    };

    const handleEnterKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchResult();
        }
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);

            try {
                // const result = await productServices.getLaptopTable(start, itemsPerPage);
                const result = await searchServices.search(debounced, 1, 8);

                if (result && result.item1) {
                    setSearchResult(result.item1);
                    console.log('searchResult', searchResult);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching laptop list:', error);
            } finally {
                // Set loading to false after fetching data
                setLoading(false);
            }
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive
            //visible
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Results</h4>
                        {searchResult.map((result, index) => {
                            return <SearchItem key={index} item={result?.item1} />;
                        })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm laptop và phụ kiện"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                    onKeyDown={handleEnterKeyDown}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')} onClick={handleSearchResult}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
