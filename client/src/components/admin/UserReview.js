import React from "react";
import { Comment, Avatar, Tooltip } from "antd";
import moment from "moment";

function UserReview(props) {
  const {review} = props;
  return (
    <Comment
      author={review.assignName}
      avatar={<Avatar icon="user" />}
      content={review.comment}
      datetime={
        <Tooltip title={moment(review.doneAt).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(review.doneAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default UserReview;
