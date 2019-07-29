import React from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button } from "antd";

import {signInUser} from '../../actions/auth';
import './auth.scss';

class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.authReducers.isAdmin) {
      this.props.history.push('/admin');
    } else if (this.props.authReducers.isAuthenticated) {
      this.props.history.push("/review");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authReducers.isAdmin) {
      this.props.history.push("/admin");
    } else if (nextProps.authReducers.isAuthenticated) {
      this.props.history.push("/review");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signInUser(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="signin-form">
        <h1 style={{fontSize: '20px'}}>Yet Anoter Review Application</h1>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              { type: "email", message: "Email address is invalid!" },
              { required: true, message: "Please input your email!" }
            ]
          })(
            <Input
              prefix={
                <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" }
            ]
          })(
            <Input
              prefix={
                <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signin-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SignIn = Form.create({ name: "normal_login" })(
  SignInForm
);

const mapStateToProps = state => ({
  authReducers: state.authReducers,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {signInUser}
)(SignIn);
