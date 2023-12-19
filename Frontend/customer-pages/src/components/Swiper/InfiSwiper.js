// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import classNames from 'classnames/bind';
import styles from './InfiSwiper.module.scss';

// register Swiper custom elements
register();

const cx = classNames.bind(styles);

function InfiSwiper() {
    return (
        <div className={cx('wrapper')}>
            <swiper-container
                slides-per-view="1"
                loop="true"
                pagination="true"
                pagination-clickable="true"
                autoplay-delay="4000"
                autoplay-disable-on-interaction="false"
                space-between="0"
                centered-slides="true"
            >
                <swiper-slide>
                    <img
                        class="img-responsive"
                        src="https://trungtran.vn/images/slideshow/2023/12/09/slideshow_large/slide-web-dai-le-sale-mung-nam-moi-2024_1702136682.webp"
                        alt="ĐẠI TIỆC SALE MỪNG NĂM MỚI 2024"
                        naptha_cursor="region"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://lh3.googleusercontent.com/vkMMX2cvl_1ii0c_vw5TGy4ixhRc-l7OlMWnmx4-oxquqHo_A9aET_lWxDmxbh-GMZTr3O5JS4kGNa0Ka7hcctxo2lj0xoUR=w1920-rw"
                        alt="Intel Gen 12"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://lh3.googleusercontent.com/sE7rCkO33ULe3i5tIElLXuCKKLncKif7dlo1uRCNSFdb2TVuqm0kNYZXmjEJ4Dk2pzcP01xDizuFBtfhUxSfsoNhcCxOomcv=w1920-rw"
                        loading="eager"
                        decoding="async"
                        alt="Giảm thêm 1 triệu dành cho laptop HP victus"
                        fetchpriority="high"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        src="https://lh3.googleusercontent.com/NEyGqAS4HkBmVGWbdLxRCJ7v4n7Xz-Xcfs6ffoxCNZMHBg0txwJk7L0FVyBvjZ9mwdFsV915-uAWlcX_JPHD1yJSq2EYfeV6=w1920-rw"
                        loading="lazy"
                        decoding="async"
                        alt="Intel Evo"
                        fetchpriority="low"
                    ></img>
                </swiper-slide>

                <swiper-slide>
                    <img
                        src="https://lh3.googleusercontent.com/Cc34HiLI1cUfHm_bBPh6-EngJMmEEZL-QuWvKxRkZVOmzojMSs-Fke4kOz9Wm37XJf1HTtVjpUCxxKEb0vD5yIIvVQshdsXdhA=w1920-rw"
                        loading="lazy"
                        decoding="async"
                        alt="Lenovo Slim 3i"
                        fetchpriority="low"
                    ></img>
                </swiper-slide>
            </swiper-container>
        </div>
    );
}

export default InfiSwiper;
