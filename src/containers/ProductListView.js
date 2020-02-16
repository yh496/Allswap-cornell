import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Products from '../components/Product';
import CustomForm from '../components/Form';

class ProductList extends React.Component {

    state = {
        products: []
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            axios.get('/api/')
            .then(res => {
                this.setState({
                    products: res.data
                })
            });
        }
    }
    render() {
        return (
            <div>
                <Products data = {this.state.products}/>
                <br />
                <h2>Upload a Product</h2>
                <CustomForm 
                    requestType = "post" 
                    productID = {null} 
                    btnTxt = "Upload" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}


export default connect(mapStateToProps)(ProductList);