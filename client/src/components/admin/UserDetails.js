import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, List, Rate, Button, Avatar, Icon, Empty } from "antd";

import UserReview from "./UserReview";
import { fetchReceivedReviews } from "../../actions/review";

class UserDetails extends React.Component {
  componentDidMount() {
    this.props.fetchReceivedReviews(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user._id !== this.props.user._id) {
      this.props.fetchReceivedReviews(nextProps.user);
    }
  }

  buildReviewInfo(rawReview) {
    const { users } = this.props;
    const assignUser = users.find(user => user._id === rawReview.assign);
    return assignUser
      ? { ...rawReview, assignName: assignUser.name }
      : rawReview;
  }

  render() {
    const { user } = this.props;

    console.dir(this.props.reviewReducers.receivedReviews);
    return (
      <div style={{ padding: "25px" }}>
        <Row>
          <Col span={4}>
            <Avatar icon="user" size={128} />
          </Col>
          <Col span={20}>
            <p>
              <Icon type="team" /> {user.department}
            </p>
            <p>
              <Icon type="mail" /> {user.email}
            </p>
          </Col>
        </Row>
        <Card title="Reviews:">
          {this.props.reviewReducers.receivedReviews &&
          this.props.reviewReducers.receivedReviews.length ? (
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={this.props.reviewReducers.receivedReviews}
              renderItem={review => <UserReview review={this.buildReviewInfo(review)} />}
            />
          ) : (
            <Empty />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({ reviewReducers: state.reviewReducers });
export default connect(
  mapStateToProps,
  { fetchReceivedReviews }
)(UserDetails);
