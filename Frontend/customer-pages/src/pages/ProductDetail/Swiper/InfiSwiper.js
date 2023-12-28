import { useEffect, useRef } from 'react';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import classNames from 'classnames/bind';
import styles from './InfiSwiper.module.scss';

// register Swiper custom elements
register();

const cx = classNames.bind(styles);

function InfiSwiper({ imageList }) {
    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
            // These are new...
            injectStyles: [
                `
                .swiper-button-next,
                .swiper-button-prev {
                    width: 30px;
                    height: 30px;
                  
                }
            `,
            ],
        };

        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
    }, []);

    return (
        <div className={cx('aaa')}>
            <swiper-container
                ref={swiperRef}
                slides-per-view="1"
                loop="true"
                navigation="true"
                pagination="true"
                pagination-clickable="true"
                init="false"
            >
                {imageList?.map((item, index) => (
                    <swiper-slide key={index}>
                        <img src={item.image} alt={item.name} />
                    </swiper-slide>
                ))}

                {/* <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT1_01.png"
                        alt="Legion_5_15ARP8_CT1_01.png"
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT2_03.png"
                        alt="Legion_5_15ARP8_CT2_03.png"
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT2_01.png"
                        alt="Legion_5_15ARP8_CT2_01.png"
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT1_03.png"
                        alt="Legion_5_15ARP8_CT1_03.png"
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT1_03.png"
                        alt="Legion_5_15ARP8_CT1_03.png"
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/upload_images/images/products/lenovo-legion/large/Legion_5_15ARP8_CT1_03.png"
                        alt="Legion_5_15ARP8_CT1_03.png"
                    />
                </swiper-slide> */}
            </swiper-container>
        </div>
    );
}

export default InfiSwiper;
