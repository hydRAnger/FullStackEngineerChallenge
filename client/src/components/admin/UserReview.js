import React from "react";
import { Comment, Avatar, Tooltip, Rate } from "antd";
import moment from "moment";

function UserReview(props) {
  const { review } = props;
  return (
    <Comment
      author={
        <span>
          {review.assignName} <Rate disabled value={review.rating} />
        </span>
      }
      avatar={<Avatar>{review.assignName[0]}</Avatar>}
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
