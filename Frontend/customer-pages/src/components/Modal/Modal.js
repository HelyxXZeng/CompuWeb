import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

const customTheme = createTheme({
    components: {
        MuiRating: {
            styleOverrides: {
                iconFilled: {
                    fontSize: '2.2rem',
                    paddingRight: '5px',
                },
                iconEmpty: {
                    fontSize: '2.2rem',
                    paddingRight: '5px',
                },
            },
        },
    },
});

function Modal({ setOpenModal }) {
    const [hoverValue, setHoverValue] = useState(-1);
    const [ratingValue, setRatingValue] = useState(0);

    const ratingsText = {
        0: '',
        1: 'Không thích',
        2: 'Tạm được',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Tuyệt vời',
    };

    const handleHover = (event, newValue) => {
        setHoverValue(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    return (
        <div className={cx('modalBackground', 'active-modal')}>
            <div className={cx('modal-wrapper')}>
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>
                        <div className={cx('modal-title')}>Đánh Giá Sản Phẩm</div>
                        <ClearIcon
                            className={cx('icon-remove')}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        ></ClearIcon>
                    </div>

                    <div className={cx('modal-body')}>
                        <div className={cx('user-rate-modal')}>
                            <img
                                src="https://images.fpt.shop/unsafe/fit-in/96x96/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg"
                                alt="alt"
                            ></img>
                            <div className={cx('name-product')}>Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H</div>
                            <div className={cx('rating-box')}>
                                <ThemeProvider theme={customTheme}>
                                    <Rating
                                        className={cx('rating-value')}
                                        value={ratingValue}
                                        onChange={handleRatingChange}
                                        onChangeActive={handleHover}
                                    />
                                </ThemeProvider>

                                <div className={cx('rating-text')}>
                                    {hoverValue !== -1 ? `${ratingsText[hoverValue]}` : `${ratingsText[ratingValue]}`}
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <textarea
                                    name="Content"
                                    placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal-footer')}>
                        <button
                            className={cx('btn-submit')}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            HOÀN TẤT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
