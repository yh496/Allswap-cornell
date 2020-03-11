import React from "react";
import { List, Icon } from "antd";
import axios from "axios";
import { render } from "@testing-library/react";
// import imagetest.jpg from "../../media/media/imagetest.jpg";
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Products extends React.Component {
  constructor() {
    super();
  }

  ex = item => {
    console.log(item.image);
    const temp = item.image;
    const ind = temp.indexOf("media");

    const fileName = temp.substring(ind);
    console.log(fileName);
    const img = require(`../../src/${fileName}`);

    return (
      <List.Item
        key={item.title}
        actions={[
          <IconText type="star-o" text="156" key="list-vertical-star-o" />,
          <IconText type="like-o" text="156" key="list-vertical-like-o" />,
          <IconText type="message" text="2" key="list-vertical-message" />
        ]}
        extra={<img width={272} alt="logo" src={img} />}
      >
        <List.Item.Meta
          title={<a href={`/products/${item.id}`}>{item.title}</a>}
          price={item.price}
        />
        {item.content}
      </List.Item>
    );
  };

  render() {
    // const img = require("../../src/media/uploads/imagetest.jpg");

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={this.props.data}
        renderItem={item => this.ex(item)}
      />
    );
  }
}

export default Products;
