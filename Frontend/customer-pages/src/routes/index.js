import config from '~/config';

//layout
import { HeaderOnly } from '~/components/Layout';

//pages
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import Laptop from '../pages/Laptop';
import Promotion from '../pages/Promotion';
import Accessory from '../pages/Accessory';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.introduce, component: Introduce },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.promotion, component: Promotion, layout: HeaderOnly },
    { path: config.routes.accessory, component: Accessory, layout: null },
    { path: '/:nickname', component: Laptop },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
