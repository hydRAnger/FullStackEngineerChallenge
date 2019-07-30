import React from "react";
import { connect } from "react-redux";
import { Button, Card, Row, Col, List, Avatar, Icon, Empty } from "antd";

import UserReview from "./UserReview";
import UserModal from "./UserModal";
import ReviewCreateModal from "./ReviewCreateModal";
import { fetchReceivedReviews } from "../../actions/review";

class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserModal: false,
      showReviewModal: false
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

  toggleReviewModal = showReviewModal => {
    this.setState({
      showReviewModal
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
    const { user, users } = this.props;

    return (
      <div className="user-details">
        <Row className="user-card">
          <Col span={4}>
            {/* FOR REVIEWER: Use fake potrait temporarily. Should allow user to edit and upload potrait in the future */}
            <Avatar size={128}>{user.name}</Avatar>
          </Col>
          <Col span={20}>
            <h2>{user.name}</h2>
            <p>
              <Icon type="team" /> {user.department}
            </p>
            <p>
              <Icon type="mail" /> {user.email}
            </p>
            <p>
              <Button
                icon="edit"
                onClick={() => {
                  this.toggleUserModal(true);
                }}
              >
                Edit User
              </Button>
              &nbsp;
              <Button
                icon="like"
                onClick={() => {
                  this.toggleReviewModal(true);
                }}
              >
                Assign a Review
              </Button>
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
        <ReviewCreateModal
          user={user}
          users={users}
          visible={this.state.showReviewModal}
          onClose={() => {
            this.toggleReviewModal(false);
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
