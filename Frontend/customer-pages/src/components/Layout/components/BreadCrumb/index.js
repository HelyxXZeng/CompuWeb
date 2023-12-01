import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './BreadCrumb.module.scss';
import classNames from 'classnames/bind';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const cx = classNames.bind(styles);

function BreadCrumb() {
    const location = useLocation();
    console.log(location);
    let currentLink = '';

    const crumbs = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '')
        .map((crumb) => {
            currentLink += `/${crumb}`;

            return (
                <div className={cx('crumb')} key={crumb}>
                    <Link className={cx('link')} to={currentLink}>
                        {crumb}
                    </Link>
                </div>
            );
        });

    return (
        <div className={cx('breadcrumb')}>
            <Breadcrumbs separator={<NavigateNextIcon style={{ fontSize: '2rem' }} />} aria-label="breadcrumb">
                <div className={cx('crumb')}>
                    <Link className={cx('link')} to="/">
                        Trang chủ
                    </Link>
                </div>

                {crumbs}
            </Breadcrumbs>
        </div>
    );
}

export default BreadCrumb;
