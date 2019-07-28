import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Rate, Button, Avatar, Icon, Empty } from "antd";

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

  render() {
    const { user } = this.props;

    console.dir(this.props.review.receivedReviews);
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
        <div>
          <h3> Reviews: </h3>
          {this.props.review.receivedReviews &&
          this.props.review.receivedReviews.length ? (
            <div>
              {this.props.review.receivedReviews.map(review => (
                <Card title={review.comment} key={review._id} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ review: state.review });
export default connect(
  mapStateToProps,
  { fetchReceivedReviews }
)(UserDetails);
