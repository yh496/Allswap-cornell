import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

class CustomForm extends React.Component {

  state = { selectedFile: null }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  handleFormSubmit = (event, requestType, productID) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', event.target.elements.title.value)
    formData.append('content', event.target.elements.content.value)
    formData.append('price', event.target.elements.price.value)
    formData.append('image', this.state.selectedFile)
    
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    switch (requestType) {
      case "POST":
        return axios
          .post(
            "/api-products/upload/", formData,
            config
          )
          .then(res => console.log(res))
          .catch(error => console.err(error));
      // case "put":
      //   return axios
      //     .put(`/api/${productID}/`, {
      //       title: title,
      //       content: content,
      //       price: price
            
      //     })
      //     .then(res => console.log(res))
      //     .catch(error => console.err(error));
    }
  };
  render() {
    return (
      <div>
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.productID
            )
          }
        >
          <FormItem label="Title">
            <Input name="title" placeholder="Put a title here" />
          </FormItem>
          <FormItem label="Content">
            <Input name="content" placeholder="Enter some content ..." />
          </FormItem>
          <FormItem label="Price">
            <Input name="price" placeholder="Enter some price ..." />
          </FormItem>
          <FormItem label = "Image">
            <Input name = "image"  type = "file" onChange = {this.fileChangedHandler}>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnTxt}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(CustomForm);
