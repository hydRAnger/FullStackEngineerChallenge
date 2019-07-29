import React from 'react';
import { Button, Avatar, Icon, Input, Rate, Tooltip } from "antd";
import { connect } from "react-redux";
import moment from "moment";

import { submitReview } from "../../actions/review";

const { TextArea } = Input;

class ReviewEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      rating: 3
    };
  }

  handleRatingChange = rating => {
    this.setState({
      rating
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { review } = this.props;
    const { comment, rating } = this.state;
    
    this.props.submitReview({
      ...review,
      comment,
      rating
    }).then(() => {
      this.props.onSubmit && this.props.onSubmit();
    })
  }

  render() {
    const { review, user } = this.props;
    const { comment, rating } = this.state;

    return (
      <div className="review-editor">
        <h2>{user.name}</h2>
        <p>
          <Tooltip
            title={moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(review.createdAt).fromNow()}</span>
          </Tooltip>
        </p>
        <Rate allowHalf value={rating} onChange={this.handleRatingChange} />
        <TextArea value={comment} onChange={this.handleCommentChange} />
        <Button icon="upload" type="primary" onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ reviewReducers: state.reviewReducers });
export default connect(
  mapStateToProps,
  { submitReview }
)(ReviewEditor);
