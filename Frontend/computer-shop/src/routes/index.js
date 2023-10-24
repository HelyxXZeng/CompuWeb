import Home from '../pages/Home';
import Product from '../pages/Product';
import Category from '../pages/Category';
import SignIn from '../pages/SignIn';

const publicRoutes = [

]

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/Product', component: Product },
    { path: '/Category', component: Category },
    { path: '/SignIn', component: SignIn, layout: null },
]

export { publicRoutes, privateRoutes };