import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  handleFormSubmit = (event, requestType, productID) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const price = event.target.elements.price.value;
    // const user = localStorage.getItem("user");
    // console.log(user);
    console.log(localStorage.getItem("token"));
    console.log(this.props.token);
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: this.props.token
    // };

    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    console.log("hi");
    switch (requestType) {
      case "POST":
        return axios
          .post(
            "/api-products/upload/",
            {
              // user: user,
              title: title,
              content: content,
              price: price
            },
            config
          )
          .then(res => console.log(res))
          .catch(error => console.err(error));
      case "put":
        return axios
          .put(`/api/${productID}/`, {
            title: title,
            content: content,
            price: price
          })
          .then(res => console.log(res))
          .catch(error => console.err(error));
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
