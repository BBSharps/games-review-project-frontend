import { getReviewsFromId, getCommentsFromId } from "../utility/axios-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCommentCard from "./reviews_comment_card";

function ReviewById() {
  const reviewId = useParams();
  const number = Number(reviewId.id);
  const [reviewComments, setReviewComments] = useState([]);
  useEffect(() => {
    getCommentsFromId(number).then((response) => {
      setReviewComments(response);
    });
  }, []);
  const [reviewByIdState, setReviewByIdState] = useState(false);
  useEffect(() => {
    getReviewsFromId(number).then((response) => {
      setReviewByIdState(response);
    });
  }, []);
  if (!reviewByIdState) {
    return <h2>loading...</h2>;
  } else {
    return (
      <div className="reviewById">
        <section>
          <h2>{reviewByIdState.title}</h2>
          <p>by</p>
          <h2>{reviewByIdState.owner}</h2>
        </section>
        <img src={reviewByIdState.review_img_url} alt="shove here"></img>
        <p className="reviewBody">{reviewByIdState.review_body}</p>
        <ul className="commentsList">
          {reviewComments.map((comment) => {
            return <ReviewCommentCard comment={comment} />;
          })}
        </ul>
      </div>
    );
  }
}

export default ReviewById;
