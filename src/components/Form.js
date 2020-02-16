import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;


class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, productID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        const price = event.target.elements.price.value;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }
        switch ( requestType ){
            case 'post':
                return axios.post('allswap-cornell.herokuapp.com/api/', {
                    title: title,
                    content: content,
                    price: price
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
            case 'put':
                return axios.put(`allswap-cornell.herokuapp.com/api/${productID}/`, {
                    title: title,
                    content: content,
                    price: price
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
        }
  
    }
    render() {
        
        return (
        <div>
            <Form onSubmit = {(event) => this.handleFormSubmit(
                event, 
                this.props.requestType,
                this.props.productID
                )}>
            <Form.Item label="Title">
                <Input name = "title" placeholder="Put a title here" />
            </Form.Item>
            <Form.Item label="Content">
                <Input name = "content" placeholder="Enter some content ..." />
            </Form.Item>
            <Form.Item label="Price">
                <Input name = "price" placeholder="Enter some price ..." />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType = "submit" >{this.props.btnTxt}</Button>
            </Form.Item>
            </Form>
        </div>
        );
    }
}   

const mapStateToProps = state => {
    return {
      token: state.token 
    }
  }


export default connect(mapStateToProps)(CustomForm);