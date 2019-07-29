import React from "react";
import { connect } from "react-redux";
import { Button, Card, Row, Col, List, Avatar, Icon, Empty } from "antd";

import UserReview from "./UserReview";
import UserModal from "./UserModal";
import { fetchReceivedReviews } from "../../actions/review";

class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserModal: false
    };
  }

  componentDidMount() {
    this.props.fetchReceivedReviews(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user._id !== this.props.user._id) {
      this.props.fetchReceivedReviews(nextProps.user);
    }
  }

  toggleUserModal = showUserModal => {
    this.setState({
      showUserModal
    });
  };

  buildReviewInfo(rawReview) {
    const { users } = this.props;
    const assignUser = users.find(user => user._id === rawReview.assign);
    return assignUser
      ? { ...rawReview, assignName: assignUser.name }
      : rawReview;
  }

  render() {
    const { user } = this.props;

    return (
      <div className="user-details">
        <Row className="user-card">
          <Col span={4}>
            <Avatar size={128}>{user.name}</Avatar>
          </Col>
          <Col span={20}>
            <h2>
              {user.name}{" "}
              <Button
                type="link"
                icon="edit"
                onClick={() => {
                  this.toggleUserModal(true);
                }}
              />
            </h2>
            <p>
              <Icon type="team" /> {user.department}
            </p>
            <p>
              <Icon type="mail" /> {user.email}
            </p>
          </Col>
        </Row>
        <Card title="Reviews:" className="reviews-card">
          {this.props.reviewReducers.receivedReviews &&
          this.props.reviewReducers.receivedReviews.length ? (
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={this.props.reviewReducers.receivedReviews}
              renderItem={review => (
                <UserReview review={this.buildReviewInfo(review)} />
              )}
            />
          ) : (
            <Empty />
          )}
        </Card>
        <UserModal
          user={user}
          visible={this.state.showUserModal}
          onClose={() => {
            this.toggleUserModal(false);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ reviewReducers: state.reviewReducers });
export default connect(
  mapStateToProps,
  { fetchReceivedReviews }
)(UserDetails);
