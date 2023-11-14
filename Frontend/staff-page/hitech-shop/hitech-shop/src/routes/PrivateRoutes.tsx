import { Navigate, Route, Routes } from 'react-router-dom';
import List from '../pages/list/List';


export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/brands' element={<List type='brand' />} />
            <Route path='/customers' element={<List type='customer' />} />
            <Route path='/orders' element={<List type='order' />} />
            <Route path='/products' element={<List type='product' />} />
            <Route path='/categories' element={<List type='category' />} />
            <Route path='/promotions' element={<List type='promotion' />} />
            <Route path='/' element={<List type='order' />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};