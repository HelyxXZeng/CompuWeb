import config from '~/config';

//layout
import { HeaderOnly } from '~/components/Layout';

//pages
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import Laptop from '../pages/Laptop';
import Promotion from '../pages/Promotion';
import LikeProduct from '../pages/LikeProduct';
import ProductDetail from '~/pages/ProductDetail';
import Cart from '~/pages/Cart';
import Order from '~/pages/Order';
import Account from '~/pages/Account';
import ManageOrder from '~/pages/ManageOrder';
import OrderDetail from '~/pages/OrderDetail';
import SearchProducts from '~/pages/SearchProducts';
import Question from '~/pages/Question';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.introduce, component: Introduce },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.question, component: Question },
    // { path: config.routes.promotion, component: Home },
    { path: config.routes.likeProduct, component: LikeProduct },
    { path: `${config.routes.productDetail}/:id`, component: ProductDetail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.order, component: Order },
    { path: `${config.routes.search}/:keyword`, component: SearchProducts },
    // { path: config.routes.account, component: Account },
    // { path: config.routes.manageOrder, component: ManageOrder },
    // { path: config.routes.orderDetail, component: OrderDetail },
];

const privateRoutes = [
    { path: config.routes.manageOrder, component: ManageOrder },
    { path: `${config.routes.orderDetail}/:id`, component: OrderDetail },
];

export { publicRoutes, privateRoutes };
