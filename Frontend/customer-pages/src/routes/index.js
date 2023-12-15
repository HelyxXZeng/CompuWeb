import config from '~/config';

//layout
import { HeaderOnly } from '~/components/Layout';

//pages
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import Laptop from '../pages/Laptop';
import Promotion from '../pages/Promotion';
import Accessory from '../pages/Accessory';
import ProductDetail from '~/pages/ProductDetail';
import Cart from '~/pages/Cart';
import Order from '~/pages/Order';
import Account from '~/pages/Account';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.introduce, component: Introduce },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.promotion, component: Promotion, layout: HeaderOnly },
    { path: config.routes.accessory, component: Accessory, layout: null },
    { path: config.routes.productDetail, component: ProductDetail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.order, component: Order },
    { path: config.routes.account, component: Account },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
