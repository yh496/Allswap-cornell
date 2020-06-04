import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomForm from '../components/Form';
import Products from '../components/Product';



class ProductUpload extends React.Component {
    state = {
        products: []
    }

    componentWillReceiveProps(newProps) {
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
    render () {
        return (
        <div>
            <br />
            <h2>Upload a Product</h2>
            <CustomForm 
                requestType = "POST" 
                productID = {null} 
                btnTxt = "Upload" />
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(ProductUpload);