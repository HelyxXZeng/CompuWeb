import Home from "./pages/home/home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/users";
import Products from "./pages/products/products";
import NavBar from "./components/navBar/navBar";
import Footer from "./pages/footer/footer";
import Menu from "./components/menu/menu";
import Login from "./pages/login/login";

import "./styles/global-styles.scss"

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
          path:"/users",
          element:<Users />,
        },
        {
          path:"/products",
          element:<Products />,
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
