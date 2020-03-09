import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Products from "../components/Product";

class userProductList extends React.Component {
  state = {
    user_products: [],
    user_id: ""
  };

  constructor() {
    super();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    axios.get("/api-user/profile/", config).then(res => {
      console.log("hi");

      this.setState({
        user_id: res.data.user_id
      });
      console.log(res.data);
      console.log(res.data.user_id);
      axios.get(`/api-products/${res.data.user_id}/`).then(res2 => {
        this.setState({
          user_products: res2.data
        });
        console.log(res2);
        console.log(res2.data);
        console.log(this.state.user_products);
      });
    });
  }

  componentWillReceiveProps(newProps) {
    const username = this.props.match.params.username;
    console.log(username);

    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: newProps.token
      };
      axios.get(`/api-products/${this.state.userID}`).then(res => {
        this.setState({
          user_products: res.data
        });
      });
    }
  }
  render() {
    return (
      <div>
        <Products data={this.state.user_products} />
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

export default connect(mapStateToProps)(userProductList);
