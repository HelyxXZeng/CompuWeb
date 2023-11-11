import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
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
                <Route path=":customerId" element={<Single type='customer' isNew='update' />} />
                <Route path="new" element={<Single type='customer' isNew='update' />} />
              </Route>
              <Route path="products">
                <Route index element={<List type='product' />} />
                <Route path=":productId" element={<Single type='product' isNew='update' />} />
                <Route path="new" element={<Single type='product' isNew='new' />} />
              </Route>
              <Route path="categories">
                <Route index element={<List type='category' />} />
                <Route path=":categoryId" element={<Single type='category' isNew='update' />} />
                <Route path="new" element={<Single type='category' isNew='new' />} />
              </Route>
              <Route path="orders">
                <Route index element={<List type='order' />} />
                <Route path=":orderId" element={<Single type='order' isNew='update' />} />
                <Route path="new" element={<Single type='order' isNew='new' />} />
              </Route>
              <Route path="brands">
                <Route index element={<List type='brand' />} />
                <Route path=":brandId" element={<Single type='brand' isNew='update' />} />
                <Route path="new" element={<Single type='brand' isNew='new' />} />
              </Route>
              <Route path="promotions">
                <Route index element={<List type='promotion' />} />
                <Route path=":promotionId" element={<Single type='promotion' isNew='update' />} />
                <Route path="new" element={<Single type='promotion' isNew='new' />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
