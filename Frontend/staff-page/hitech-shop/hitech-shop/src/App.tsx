import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import './styles/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'


function App() {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="customers">
                <Route index element={<List type='customer' />} />
                <Route path=":customerId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="products">
                <Route index element={<List type='product' />} />
                <Route path=":productId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="categories">
                <Route index element={<List type='category' />} />
                <Route path=":categoryId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="orders">
                <Route index element={<List type='order' />} />
                <Route path=":orderId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="brands">
                <Route index element={<List type='brand' />} />
                <Route path=":brandId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="promotions">
                <Route index element={<List type='promotion' />} />
                <Route path=":promotionId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
