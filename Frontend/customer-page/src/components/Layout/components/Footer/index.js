import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import HitechLogoWhite from '~/assets/images/hitechLogo_white.png';
import SloganWhite from '~/assets/images/slogan_white.png';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('footer-content')}>
                <div className={cx('footer-col', 'left')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img className={cx('img1')} src={HitechLogoWhite} alt="HitechLogo" />
                        <img className={cx('img2')} src={SloganWhite} alt="Slogan" />
                    </Link>
                    <h3>THEO DÕI CHÚNG TÔI</h3>
                    <ul className={cx('socials')}>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon className={cx('icon')} icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon className={cx('icon')} icon={faInstagram} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon className={cx('icon')} icon={faYoutube} />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={cx('footer-col', 'middle')}>
                    <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                    <ul className={cx('')}>
                        <li>
                            <a href="https://trungtran.vn/ct-hoi-dap/" rel="nofollow">
                                Hỏi đáp
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/tuyen-dung" rel="nofollow">
                                {' '}
                                Tuyển dụng{' '}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={cx('footer-col', 'right')}>
                    <h3>CHÍNH SÁCH</h3>
                    <ul className={cx('')}>
                        <li>
                            <a href="https://trungtran.vn/chinh-sach-bao-mat-thong-tin/" rel="nofollow">
                                {' '}
                                Chính sách bảo mật thông tin{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/chinh-sach-bao-hanh/" rel="nofollow">
                                {' '}
                                Chính sách bảo trì, bảo hành{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/thong-tin-thanh-toan/" rel="nofollow">
                                {' '}
                                Chính sách thanh toán{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/chinh-sach-van-chuyen-va-giao-nhan/" rel="nofollow">
                                {' '}
                                Chính sách vận chuyển và giao nhận{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/chinh-sach-doi-tra-va-hoan-tien/" rel="nofollow">
                                {' '}
                                Chính sách đổi trả và hoàn tiền{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/chinh-sach-kiem-hang/" rel="nofollow">
                                {' '}
                                Chính sách kiểm hàng{' '}
                            </a>
                        </li>
                        <li>
                            <a href="https://trungtran.vn/gop-y-khieu-nai/" rel="nofollow">
                                {' '}
                                Chính sách xử lý khiếu nại{' '}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={cx('footer-col', 'categories')}>
                    <h3>DANH MỤC SẢN PHẨM</h3>
                    <div className={cx('inner-categories')}>
                        <div className={cx('inner-col-categories')}>
                            <ul>
                                <li>
                                    <a href="https://trungtran.vn/dell/" rel="nofollow">
                                        {' '}
                                        Laptop Dell{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/hp/" rel="nofollow">
                                        {' '}
                                        Laptop HP{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/thinkpad/" rel="nofollow">
                                        {' '}
                                        Laptop Thinkpad{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/lenovo/" rel="nofollow">
                                        {' '}
                                        Laptop Lenovo{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/acer/" rel="nofollow">
                                        {' '}
                                        Laptop Acer{' '}
                                    </a>
                                </li>{' '}
                            </ul>
                        </div>
                        <div className={cx('inner-col-categories')}>
                            <ul>
                                <li>
                                    <a href="https://trungtran.vn/apple/" rel="nofollow">
                                        {' '}
                                        Macbook{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/asus/" rel="nofollow">
                                        {' '}
                                        Laptop Asus{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/razer/" rel="nofollow">
                                        {' '}
                                        Razer{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/microsoft/" rel="nofollow">
                                        {' '}
                                        Microsoft{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://trungtran.vn/msi/" rel="nofollow">
                                        {' '}
                                        Laptop MSI{' '}
                                    </a>
                                </li>{' '}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('footer-bottom')}>
                <p>
                    Công ty TNHH Công Nghệ Số Hitech
                    <br />
                    MST 0109900432 do Sở KH và ĐT TP Hà Nội cấp ngày 28/01/2022
                    <br />
                    <br />
                    Địa chỉ: 2C Bạch Đằng, P. Chương Dương, Q. Hoàn Kiếm, TP. Hà Nội
                    <br />
                    Địa chỉ Showroom Kinh Doanh: Số 3 Ngõ 117 Thái Hà, P. Trung Liệt, Q. Đống Đa, TP. Hà Nội
                    <br />
                    Hotline: 0969.819.818
                    <br />
                    Mail: cskh.hitech.vn@gmail.com
                </p>
            </div>
        </footer>
    );
}

export default Footer;
