import { Navigate, Route, Routes } from 'react-router-dom';
import List from '../pages/list/List';
import Single from '../pages/single/Single';


export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<List type='order' />} />
            <Route path='*' element={<Navigate to='/' replace />} />

            <Route path='/brands' element={<List type='brand' />} />
            <Route path='/customers' element={<List type='customer' />} />
            <Route path='/orders' element={<List type='order' />} />
            <Route path='/products' element={<List type='product' />} />
            <Route path='/categories' element={<List type='category' />} />
            <Route path='/promotions' element={<List type='promotion' />} />
            <Route path='/productLines' element={<List type='productLine' />} />
            <Route path='/productVariants' element={<List type='productVariant' />} />
            <Route path='/productInstances' element={<List type='productInstance' />} />
            <Route path='/specificationTypes' element={<List type='specificationType' />} />
            <Route path='/specifications' element={<List type='specification' />} />
            <Route path='/prices' element={<List type='price' />} />

            <Route path='/brands/new' element={<Single type='brand' isNew='new' />} />
            <Route path='/customers/new' element={<Single type='customer' isNew='new' />} />
            <Route path='/orders/new' element={<Single type='order' isNew='new' />} />
            <Route path='/products/new' element={<Single type='product' isNew='new' />} />
            <Route path='/categories/new' element={<Single type='category' isNew='new' />} />
            <Route path='/promotions/new' element={<Single type='promotion' isNew='new' />} />
            <Route path='/productLines/new' element={<Single type='productLine' isNew='new' />} />
            <Route path='/productVariants/new' element={<Single type='productVariant' isNew='new' />} />
            <Route path='/productInstances/new' element={<Single type='productInstance' isNew='new' />} />
            <Route path='/specificationTypes/new' element={<Single type='specificationType' isNew='new' />} />
            <Route path='/specifications/new' element={<Single type='specification' isNew='new' />} />
            <Route path='/prices/new' element={<Single type='price' isNew='new' />} />

            <Route path='/brands/:id' element={<Single type='brand' isNew='update' />} />
            <Route path='/customers/:id' element={<Single type='customer' isNew='update' />} />
            <Route path='/orders/:id' element={<Single type='order' isNew='update' />} />
            <Route path='/products/:id' element={<Single type='product' isNew='update' />} />
            <Route path='/categories/:id' element={<Single type='category' isNew='update' />} />
            <Route path='/promotions/:id' element={<Single type='promotion' isNew='update' />} />
            <Route path='/productLines/:id' element={<Single type='productLine' isNew='update' />} />
            <Route path='/productVariants/:id' element={<Single type='productVariant' isNew='update' />} />
            <Route path='/productInstances/:id' element={<Single type='productInstance' isNew='update' />} />
            <Route path='/specificationTypes/:id' element={<Single type='specificationType' isNew='update' />} />
            <Route path='/specifications/:id' element={<Single type='specification' isNew='update' />} />
            <Route path='/prices/:id' element={<Single type='price' isNew='update' />} />
        </Routes>
    );
};