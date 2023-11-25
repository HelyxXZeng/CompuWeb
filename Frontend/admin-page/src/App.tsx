import Home from "./pages/home/home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Staffs from "./pages/staffs/staffs";
//import Products from "./pages/products/products";
import NavBar from "./components/navBar/navBar";
import Footer from "./pages/footer/footer";
import Menu from "./components/menu/menu";
import Login from "./pages/login/login";
import Staff from "./pages/staff/Staff";
import "./styles/global-styles.scss";
import Promotion from "./pages/promotion/Promotion";


function App() {
  const Layout = () => { 
    return (
      <div className="main">
        <NavBar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router= createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/", 
          element:<Home />,
        },
        {
          path:"/staffs",
          element:<Staffs />,
        },
        {
          path:"/staffs/:id",
          element:<Staff />,
        },
        {
          path:"/promotions",
          element:<Promotion />,
        },
        {
          path:"/promotions/:id",
          element:<Promotion />,
        },
      ]
    },
    {
      path:"/login",
      element:<Login />,
    }
  ]);
  return <RouterProvider router={router} />;
  

}

export default App
