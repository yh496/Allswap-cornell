import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Products from '../components/Product';

class userProductList extends React.Component {

    state = {
        user_products: []
    }

    componentWillReceiveProps(newProps) {
        const username = this.props.match.params.username;
        console.log(username);

        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            axios.get(`/api/${username}/products`)
            .then(res => {
                this.setState({
                    user_products: res.data
                })
            });
        }
    }
    render() {
        return (
            <div>
                <Products data = {this.state.user_products}/>
                <br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}


export default connect(mapStateToProps)(userProductList);