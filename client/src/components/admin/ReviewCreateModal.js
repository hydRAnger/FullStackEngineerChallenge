import React from "react";
import { Modal, Radio } from "antd";
import { connect } from "react-redux";

import { createReview } from "../../actions/review";

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class ReviewCreateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedUser: null,
      confirmLoading: false
    };
  }

  handleSelect = e => {
    this.setState({
      selectedUser: e.target.value
    });
  };

  handleOk = e => {
    e.preventDefault();

    this.setState({ confirmLoading: true }, () => {
      this.props
        .createReview({
          assign: this.state.selectedUser._id,
          target: this.props.user._id
        })
        .then(() => {
          this.setState({ confirmLoading: false });
          this.props.onClose && this.props.onClose();
        });
    });
  };

  handleClose = () => {
    this.setState({
      confirmLoading: false
    });
    this.props.onClose && this.props.onClose();
  };

  render() {
    const { user, users } = this.props;
    const { confirmLoading, selectedUser } = this.state;
    const reviewers = users.filter(u => u._id !== user._id);

    return (
      <Modal
        title={`Create a review for ${user.name}`}
        visible={this.props.visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        okButtonProps={{ disabled: !selectedUser }}
        onCancel={this.handleClose}
      >
        <Radio.Group onChange={this.handleSelect} value={selectedUser}>
          {reviewers.map(reviewer => (
            <Radio style={radioStyle} value={reviewer} key={reviewer._id}>
              {reviewer.name}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
    );
  }
}

export default connect(
  null,
  { createReview }
)(ReviewCreateModal);
