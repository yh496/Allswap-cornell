import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


import { Button, Card } from 'antd';

import CustomForm from '../components/Form';

class ProductDetail extends React.Component {

    state = {
        product: {}
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            const productID = this.props.match.params.productID;
            axios.get(`allswap-cornell.herokuapp.com/api/${productID}/`)
                .then(res => {  
                    this.setState({
                        product: res.data
                    });
                })
        }
    }

    handleDelete = (event) => {
        if (this.props.token !== null) {
            const productID = this.props.match.params.productID;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
            axios.delete(`allswap-cornell.herokuapp.com/api/${productID}/`);
            this.props.history.push('/');
            this.forceUpdate();
        } else {

        }
        
    }

    render() {
        return (
            <div>  
                <Card title = {this.state.product.title}> 
                    <p> {this.state.product.content} </p>
                    <p> {this.state.product.price} </p>
                </Card>
                <CustomForm 
                    requestType = "put"
                    productID = {this.props.match.params.productID} 
                    btnTxt = "Update"/>

                <form onSubmit = {this.handleDelete}>
                    <Button type = "danger" htmlType = "submit"> Delete </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token 
    }
  }

export default connect(mapStateToProps)(ProductDetail);