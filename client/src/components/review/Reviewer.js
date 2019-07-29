import React from 'react';
import { Button, Layout, Spin, Empty } from "antd";
import { connect } from "react-redux";

import ReviewEditor from "./ReviewEditor";
import { fetchUsers } from "../../actions/user";
import { fetchAssignmentReviews } from "../../actions/review";
import "./review.scss";

const { Header, Content } = Layout;

class Reviewer extends React.Component {
  componentDidMount() {
    this.props.fetchAssignmentReviews(this.props.user);
    this.props.fetchUsers();
  }

  getReivewTarget = review => {
    const { users } = this.props.userReducers;

    return users.find(user => user._id === review.target);
  }

  handleSignOut = e => {
    e.preventDefault();

    this.props.history.push("/signin");
    this.props.signOutUser();
  };

  render() {
    const {
      loadingAssignmentReviews,
      assignmentReviews
    } = this.props.reviewReducers;
    const loadingUsers = this.props.userReducers.loading;

    return (
      <Layout>
        <Header className="header-reviewer">
          Reviews need to do
          <Button
            className="btn-signout"
            icon="logout"
            type="primary"
            onClick={this.handleSignOut}
          >
            SignOut
          </Button>

        </Header>
        <Content>
          {(loadingAssignmentReviews || loadingUsers) ? (
            <Spin />
          ) : assignmentReviews.lengh === 0 ? (
            <Empty />
          ) : (
            assignmentReviews.map(review => (
              <ReviewEditor key={review._id} review={review} user={this.getReivewTarget(review)} />
            ))
          )}
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  reviewReducers: state.reviewReducers,
  userReducers: state.userReducers
});
export default connect(
  mapStateToProps,
  { fetchUsers, fetchAssignmentReviews }
)(Reviewer);
