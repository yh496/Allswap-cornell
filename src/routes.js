import React from 'react';
import { Route } from 'react-router-dom';
import ProductList from './containers/ProductListView';
import ProductDetail from './containers/ProductDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Upload from './containers/ProductUploadView';
import userProductList from './containers/userProductListView';

const BaseRouter = () => (
    <div>
        <Route exact path = '/' component = {ProductList} />
        <Route exact path = '/myProducts/' component = {userProductList} />
        <Route exact path = '/products/:productID/' component = {ProductDetail} />
        <Route exact path = '/login/' component = {Login} />
        <Route exact path = '/signup/' component = {Signup} />
        <Route exact path = '/upload/' component = {Upload} />


    </div>
);

export default BaseRouter;