
import Home from "../pages/Home"
import Product from "../pages/Products"
import SignIn from "../pages/SignIn"

const publicRoutes = [
    { path: '/SignIn', component: SignIn },
]

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/Product', component: Product },
    { path: '/SignIn', component: SignIn, layout: null },
]

export { publicRoutes, privateRoutes }