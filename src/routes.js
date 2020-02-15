import React from 'react';
import { Route } from 'react-router-dom';
import ProductList from './containers/ProductListView';
import ProductDetail from './containers/ProductDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path = '/' component = {ProductList} />
        <Route exact path = '/products/:productID/' component = {ProductDetail} />
        <Route exact path = '/login/' component = {Login} />
        <Route exact path = '/signup/' component = {Signup} />


    </div>
);

export default BaseRouter;