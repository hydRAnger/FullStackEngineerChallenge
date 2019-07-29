import React from "react";
import { Modal, Form, Input, Icon } from "antd";
import { connect } from "react-redux";

import { createUser, updateUser, fetchUsers } from "../../actions/user";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

class UserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmLoading: false
    };
  }

  handleOk = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { user, updateUser, createUser } = this.props;
        const service = user ? updateUser : createUser;
        const payload = user ? { ...values, _id: user._id } : values;
        this.setState({ confirmLoading: true }, () => {
          service(payload).then(() => {
            this.setState({ confirmLoading: false });
            this.props.fetchUsers();
            this.props.onClose && this.props.onClose();
          });
        });
      }
    });
  };

  handleClose = () => {
    this.setState({
      confirmLoading: false
    });
    this.props.onClose && this.props.onClose();
  };

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state;

    return (
      <Modal
        title={user ? `Edit ${user.name}` : "Create New User"}
        visible={this.props.visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleClose}
      >
        <Form onSubmit={this.handleOk}>
          <Form.Item {...formItemLayout} label="name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "User name is required." }],
              initialValue: user ? user.name : ""
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="email">
            {getFieldDecorator("email", {
              rules: [
                { type: "email", message: "Email address is invalid." },
                { required: true, message: "Email is required." }
              ],
              initialValue: user ? user.email : ""
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="department">
            {getFieldDecorator("department", {
              rules: [{ required: true, message: "Department is required." }],
              initialValue: user ? user.department : ""
            })(
              <Input
                prefix={
                  <Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Department"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please set password for new user." }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(
  null,
  { createUser, updateUser, fetchUsers }
)(Form.create({ name: "user_form" })(UserModal));
