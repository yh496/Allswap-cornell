import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Products from "../components/Product";
import CustomForm from "../components/Form";

class ProductList extends React.Component {
  state = {
    products: []
  };

  constructor() {
    super();
    console.log("hi");
    console.log(localStorage.getItem("token"));
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    axios.get("/api-products/", config).then(res => {
      console.log(res);
      this.setState({
        products: res.data
      });
    });
  }
  //   componentWillReceiveProps(newProps) {
  //     if (newProps.token) {
  //       //   axios.defaults.headers = {
  //       //     "Content-Type": "application/json",
  //       //     Authorization: newProps.token
  //       //   };

  //       const config = {
  //         headers: { Authorization: `Bearer ${this.props.token}` }
  //       };

  //       axios.get("/api-products/", config).then(res => {
  //         console.log(res);
  //         this.setState({
  //           products: res.data
  //         });
  //       });
  //     }
  //   }
  render() {
    return (
      <div>
        <Products data={this.state.products} />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ProductList);
