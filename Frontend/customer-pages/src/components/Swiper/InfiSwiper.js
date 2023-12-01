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
                css-mode="true"
                pagination-clickable="true"
                autoplay-delay="4000"
                autoplay-disable-on-interaction="false"
                space-between="30"
                centered-slides="true"
            >
                <swiper-slide>
                    <img
                        src="https://trungtran.vn/images/slideshow/2023/02/22/slideshow_large/dell-xps-13_1677050031.webp"
                        width="776"
                        height="360"
                        alt="Dell XPS 13"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        class="img-responsive"
                        src="https://trungtran.vn/images/slideshow/2023/02/22/slideshow_large/slide-laptop-gaming-790x315px_1677049997.webp"
                        width="776"
                        height="360"
                        alt="Laptop Gaming"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        class="img-responsive"
                        src="https://trungtran.vn/images/slideshow/2023/02/22/slideshow_large/slide-dinh-vi--790x315px_1677049738.webp"
                        width="776"
                        height="360"
                        alt="Giới thiệu dịch vụ Trung Trần"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        class="img-responsive"
                        src="https://trungtran.vn/images/slideshow/2023/05/18/slideshow_large/slide-so-sanh-laptop-nhap-my-vs-trung-quoc_1684377408.webp"
                        width="776"
                        height="360"
                        alt="Laptop nhập Mỹ có tốt hơn Laptop nhập Trung Quốc? Nguồn gốc Laptop cũ"
                    ></img>
                </swiper-slide>
                <swiper-slide>
                    <img
                        class="img-responsive"
                        src="https://trungtran.vn/images/slideshow/2023/02/22/slideshow_large/slide-macbook-pro-790x315px_1677049827.webp"
                        width="776"
                        height="360"
                        alt="Macbook Pro"
                    ></img>
                </swiper-slide>
            </swiper-container>
        </div>
    );
}

export default InfiSwiper;
