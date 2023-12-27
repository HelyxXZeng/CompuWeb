import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { auth } from '~/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        name: '', // Initial error message for the name field
    });
    const telephoneInputRef = useRef(null);

    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    // const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    const otpExpirationTime = 60;

    const [timer, setTimer] = useState(otpExpirationTime); // Set the initial timer value (in seconds)

    // Function to start the countdown timer
    const startTimer = () => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                // Ensure the timer does not go below 0
                return Math.max(0, prevTimer - 1);
            });
        }, 1000);

        // Clear the interval when the component unmounts or when the timer reaches 0
        return () => clearInterval(countdown);
    };

    useEffect(() => {
        // Start the timer when showOTP is true
        if (showOTP) {
            startTimer();
        } else {
            // Reset the timer when OTP is not shown
            setTimer(otpExpirationTime);
        }
    }, [showOTP]);

    // ... (existing code)

    // Function to reset the timer
    const resetTimer = () => {
        setTimer(otpExpirationTime);
    };

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

    // Function to retry sign-in with exponential backoff
    // const signInWithPhoneNumberWithBackoff = async (phoneNumber, appVerifier, maxRetries = 3) => {
    //     let retries = 0;

    //     const signIn = async () => {
    //         try {
    //             const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    //             window.confirmationResult = confirmationResult;
    //             // Proceed with the rest of your code
    //         } catch (error) {
    //             if (error.code === 'auth/too-many-requests' && retries < maxRetries) {
    //                 // Retry with an increasing delay (exponential backoff)
    //                 const delay = Math.pow(2, retries) * 1000; // Exponential backoff in seconds
    //                 await new Promise((resolve) => setTimeout(resolve, delay));
    //                 retries++;
    //                 await signIn();
    //             } else {
    //                 // Handle other errors or give up after maxRetries
    //                 console.error(error);
    //                 // You might want to update the UI to inform the user about the error
    //                 // and possibly provide guidance on what to do next
    //             }
    //         }
    //     };

    //     await signIn();
    // };

    // function onSignup() {
    //     onCaptchVerify();

    //     const appVerifier = window.recaptchaVerifier;
    //     const formatPh = '+' + ph;

    //     signInWithPhoneNumberWithBackoff(formatPh, appVerifier);
    // }

    function convertToInternationalFormat(phoneNumber) {
        // Remove leading zero if present
        const cleanedNumber = phoneNumber.replace(/^0+/, '');

        // Add the country code
        const internationalFormat = `+84${cleanedNumber}`;

        return internationalFormat;
    }

    function onSignup() {
        // Reset errors for all fields
        setErrors({
            telephone: '',
            // Add more fields as needed
        });

        // Validation for "Số điện thoại"
        const telephoneRegex = /^[0-9]{10}$/; // Exactly ten numeric digits
        if (!ph || !ph.match(/^\d+$/) || !telephoneRegex.test(ph)) {
            setErrors((prevErrors) => ({ ...prevErrors, telephone: 'Số điện thoại trống/không đúng định dạng' }));
            telephoneInputRef.current.focus();
            return;
        }

        // //setLoading(true);
        // // Example using setTimeout to delay initialization
        // setTimeout(() => {
        //     onCaptchVerify();
        // }, 10000); // Adjust the delay as needed

        // const appVerifier = window.recaptchaVerifier;

        // console.log('appVerifier', appVerifier);

        // // const formatPh = '+' + ph;

        // const formatPh = convertToInternationalFormat(ph);

        // signInWithPhoneNumber(auth, formatPh, appVerifier)
        //     .then((confirmationResult) => {
        //         window.confirmationResult = confirmationResult;
        //         //setLoading(false);
        //         setShowOTP(true);

        //         // Reset the timer when a new OTP is requested
        //         resetTimer();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         //setLoading(false);
        //     });

        // Example using setTimeout to delay initialization
        setTimeout(() => {
            onCaptchVerify();

            // After verifying reCAPTCHA, proceed to sign up
            const appVerifier = window.recaptchaVerifier;
            console.log('appVerifier', appVerifier);
            const formattedPh = convertToInternationalFormat(ph);

            signInWithPhoneNumber(auth, formattedPh, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    //setLoading(false);
                    setShowOTP(true);

                    // Reset the timer when a new OTP is requested
                    resetTimer();
                })
                .catch((error) => {
                    console.log('signInWithPhoneNumber', error);
                    //setLoading(false);
                });
        }, 1000); // Adjust the delay as needed
    }

    function onOTPVerify() {
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);

                navigate(config.routes.manageOrder); // Adjust the path accordingly
            })
            .catch((err) => {
                console.log(err);
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

                {showOTP ? (
                    <div>
                        <div className={cx('top-title')}>
                            <p className={cx('note')}>
                                Mã xác nhận đã được gửi qua tin nhắn của số điện thoại <b>{ph}</b>
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

                        {/* {errors.telephone && (
                            <div className={cx('error-message')}>* Mã xác nhận không đúng, vui lòng thử lại.</div>
                        )} */}

                        <div className={cx('box')}>
                            <button onClick={onOTPVerify} className={cx('submitLogin', 'submit-btn')}>
                                Xác nhận{' '}
                            </button>
                        </div>

                        <div className={cx('box', 'box-center')}>
                            {timer > 0 ? (
                                <span className={cx('resend-sms')}>
                                    Nếu không nhận được mã, thử lại sau {timer} giây
                                </span>
                            ) : (
                                <a className={cx('resend-sms')} href="/#">
                                    Gửi lại mã xác nhận
                                </a>
                            )}
                        </div>

                        <div className={cx('box', 'box-center')}>
                            <a href="/#" className={cx('btnChangeNum')} onClick={() => setOtp('')}>
                                Thay đổi số điện thoại
                            </a>
                        </div>
                        {/* </form> */}

                        <p className={cx('note')}>
                            Trung Trần cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có được sự
                            đồng ý của bạn.
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
                                ref={telephoneInputRef}
                            />
                        </div>

                        {errors.telephone && <div className={cx('error-message')}>{errors.telephone}</div>}

                        <div className={cx('box')}>
                            <button onClick={onSignup} className={cx('submitLogin', 'submit-btn')}>
                                Tiếp tục
                            </button>
                        </div>
                        {/* </form> */}

                        <p className={cx('note')}>
                            Hitech cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có được sự
                            đồng ý của bạn.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;
