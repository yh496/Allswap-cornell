import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Form, Input, Icon, Button } from "antd";
import { NavLink } from "react-router-dom";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        this.props.onAuth(
          values.email,
          values.password,
          values.confirm,
          values.first_name,
          values.last_name,
          values.phone_number
        );
      }
      this.props.history.push("/");
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
            </Form.Item> */}
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("first_name", {
            rules: [
              // {
              //   type: "first_name",
              //   message: "The input is not valid E-mail!"
              // },
              {
                required: true,
                message: "Please input your first name!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="First Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("last_name", {
            rules: [
              // {
              //   type: "last_name",
              //   message: "The input is not valid E-mail!"
              // },
              {
                required: true,
                message: "Please input your last name!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Last Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("phone_number", {
            rules: [
              // {
              //   type: "phone_number",
              //   message: "The input is not valid phone number!"
              // },
              {
                required: true,
                message: "Please input your phone number!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Phone Number"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Signup
          </Button>
          Or
          <NavLink style={{ marginRight: "10px" }} to="/login/">
            {" "}
            Login
          </NavLink>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

const mapStatetoProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, confirm, first_name, last_name, phone_number) =>
      dispatch(
        actions.authSignup(
          email,
          password,
          confirm,
          first_name,
          last_name,
          phone_number
        )
      )
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
