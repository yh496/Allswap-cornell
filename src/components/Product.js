import React from "react";
import { List, Icon } from "antd";
// import imagetest.jpg from "../../media/media/imagetest.jpg";
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Products = props => {
  console.log(props)
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
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
            <IconText type="message" text="2" key="list-vertical-message" />
          ]}
          extra={
            <img
              width={272}
              alt = "product" />
          }
        >
          <List.Item.Meta
            title={<a href={`/products/${item.id}`}>{item.title}</a>}
            price={item.price}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default Products;
