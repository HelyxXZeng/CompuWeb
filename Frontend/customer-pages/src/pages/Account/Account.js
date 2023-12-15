import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import { useState } from 'react';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { auth } from '~/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const cx = classNames.bind(styles);

function Account() {
    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    // const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        onSignup();
                    },
                    'expired-callback': () => {},
                },
                auth,
            );
        }
    }

    function onSignup() {
        //setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+' + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                //setLoading(false);
                setShowOTP(true);
            })
            .catch((error) => {
                console.log(error);
                //setLoading(false);
            });
    }

    function onOTPVerify() {
        //setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                //setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                //setLoading(false);
            });
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img
                    src="https://trungtran.vn/modules/members/assets/images/log.svg"
                    alt="log"
                    className={cx('img-responsive')}
                />

                <ul>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6663 7.38668V8.00001C14.6655 9.43763 14.2 10.8365 13.3392 11.9879C12.4785 13.1393 11.2685 13.9817 9.88991 14.3893C8.51129 14.7969 7.03785 14.7479 5.68932 14.2497C4.3408 13.7515 3.18944 12.8307 2.40698 11.6247C1.62452 10.4187 1.25287 8.99205 1.34746 7.55755C1.44205 6.12305 1.99781 4.75756 2.93186 3.66473C3.86591 2.57189 5.1282 1.81027 6.53047 1.49344C7.93274 1.17662 9.39985 1.32157 10.713 1.90668"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.6667 2.66669L8 9.34002L6 7.34002"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        Mua hàng khắp thế giới cực dễ dàng, nhanh chóng
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6663 7.38668V8.00001C14.6655 9.43763 14.2 10.8365 13.3392 11.9879C12.4785 13.1393 11.2685 13.9817 9.88991 14.3893C8.51129 14.7969 7.03785 14.7479 5.68932 14.2497C4.3408 13.7515 3.18944 12.8307 2.40698 11.6247C1.62452 10.4187 1.25287 8.99205 1.34746 7.55755C1.44205 6.12305 1.99781 4.75756 2.93186 3.66473C3.86591 2.57189 5.1282 1.81027 6.53047 1.49344C7.93274 1.17662 9.39985 1.32157 10.713 1.90668"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.6667 2.66669L8 9.34002L6 7.34002"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6663 7.38668V8.00001C14.6655 9.43763 14.2 10.8365 13.3392 11.9879C12.4785 13.1393 11.2685 13.9817 9.88991 14.3893C8.51129 14.7969 7.03785 14.7479 5.68932 14.2497C4.3408 13.7515 3.18944 12.8307 2.40698 11.6247C1.62452 10.4187 1.25287 8.99205 1.34746 7.55755C1.44205 6.12305 1.99781 4.75756 2.93186 3.66473C3.86591 2.57189 5.1282 1.81027 6.53047 1.49344C7.93274 1.17662 9.39985 1.32157 10.713 1.90668"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.6667 2.66669L8 9.34002L6 7.34002"
                                stroke="#20863D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi
                    </li>
                </ul>
            </div>
            <div className={cx('main')}>
                <div id="recaptcha-container"></div>
                {user ? (
                    <div>
                        <p>success</p>
                    </div>
                ) : (
                    <>
                        {showOTP ? (
                            <div>
                                <div className={cx('top-title')}>
                                    <p className={cx('note')}>
                                        Mã xác nhận đã được gửi qua tin nhắn của số điện thoại <b>0971881215</b>
                                    </p>
                                </div>

                                {/* <form action="" method="post" className={cx('frmLogin')} id="frmLogin"> */}
                                <div className={cx('box')}>
                                    <LockOutlinedIcon className={cx('phone-icon')} />
                                    <input
                                        className={cx('form-control')}
                                        name="log_email"
                                        id="log_email"
                                        placeholder="Nhập mã xác nhận gồm 6 chữ số"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>

                                <div className={cx('box')}>
                                    <button onClick={onOTPVerify} className={cx('submitLogin', 'submit-btn')}>
                                        Xác nhận{' '}
                                    </button>
                                </div>

                                <div className={cx('box', 'box-center')}>
                                    <a className={cx('resend-sms')} href="/#">
                                        Gửi lại mã xác nhận
                                    </a>
                                </div>

                                <div className={cx('box', 'box-center')}>
                                    <a href="/#" onclick="changeNum()" className={cx('btnChangeNum')}>
                                        Thay đổi số điện thoại
                                    </a>
                                </div>
                                {/* </form> */}

                                <p className={cx('note')}>
                                    Trung Trần cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có
                                    được sự đồng ý của bạn.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className={cx('top-title')}>
                                    <a href="/#" title="Đăng nhập" className={cx('active')}>
                                        Tra cứu thông tin đơn hàng
                                    </a>
                                </div>
                                {/* <form action="" method="post" className={cx('frmLogin')} id="frmLogin"> */}
                                <div className={cx('box')}>
                                    <PhoneAndroidIcon className={cx('phone-icon')} />
                                    <input
                                        type="tel"
                                        className={cx('form-control')}
                                        name="log_email"
                                        id="log_email"
                                        placeholder="Nhập số điện thoại mua hàng"
                                        value={ph}
                                        onChange={(e) => setPh(e.target.value)}
                                    />
                                </div>

                                <div className={cx('box')}>
                                    <button onClick={onSignup} className={cx('submitLogin', 'submit-btn')}>
                                        Tiếp tục
                                    </button>
                                </div>
                                {/* </form> */}

                                <p className={cx('note')}>
                                    Hitech cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có
                                    được sự đồng ý của bạn.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Account;
