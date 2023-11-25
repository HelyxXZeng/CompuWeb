import styles from './Frame.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Frame({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Frame;
