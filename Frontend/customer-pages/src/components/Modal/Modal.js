import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';

import * as orderServices from '~/apiServices/orderServices';

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

function Modal({ selectedOrderItem, setOpenModal }) {
    const [hoverValue, setHoverValue] = useState(-1);
    const [ratingValue, setRatingValue] = useState(0);

    const [content, setContent] = useState('');

    const ratingsText = {
        0: '',
        1: 'Không thích',
        2: 'Tạm được',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Tuyệt vời',
    };

    const [errorText, setErrorText] = useState(false);

    const handleHover = (event, newValue) => {
        setHoverValue(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    const handlePostRating = async () => {
        // At this point, all validations have passed, and you can proceed to create the data object
        const currentDate = new Date(); // Create a new Date object with the current date and time
        const formattedDate = currentDate.toISOString(); // Format the date string as 'YYYY-MM-DDTHH:mm:ss.sssZ'
        const ratingData = {
            // orderItemId: orderItemId,
            orderItemId: selectedOrderItem?.orderItemIds[0],
            date: formattedDate,
            rate: ratingValue,
            comment: content,
            status: 'APPROVED',
        };

        setErrorText(false);

        if (ratingValue > 0) {
            //await orderServices.postRating(ratingData);
            console.log('ratingData', ratingData);

            // Retrieve the existing array from local storage
            const existingOrderItemRated = JSON.parse(localStorage.getItem('orderItemRated')) || [];

            // Push the new item to the array
            existingOrderItemRated.push(selectedOrderItem?.orderItemIds[0]);

            // Store the updated array back into local storage
            localStorage.setItem('orderItemRated', JSON.stringify(existingOrderItemRated));

            setOpenModal(false);
        } else {
            setErrorText(true);
        }
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
                                src={
                                    selectedOrderItem?.image ||
                                    'https://images.fpt.shop/unsafe/fit-in/96x96/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg'
                                }
                                alt="alt"
                            ></img>
                            <div className={cx('name-product')}>{selectedOrderItem?.name}</div>
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
                                {errorText && <div className={cx('error-rating')}>Vui lòng đánh giá sản phẩm</div>}
                            </div>
                            <div className={cx('form-group')}>
                                <textarea
                                    name="Content"
                                    placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal-footer')}>
                        <button className={cx('btn-submit')} onClick={handlePostRating}>
                            HOÀN TẤT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
