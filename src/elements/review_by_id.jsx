import {
  getReviewsFromId,
  getCommentsFromId,
  patchPlusVote,
} from "../utility/axios-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCommentCard from "./reviews_comment_card";

function ReviewById() {
  const reviewId = useParams();
  const number = Number(reviewId.id);
  const [votes, setVotes] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [reviewComments, setReviewComments] = useState([]);
  const [reviewByIdState, setReviewByIdState] = useState(false);
  useEffect(() => {
    getCommentsFromId(number).then((response) => {
      setReviewComments(response);
      getReviewsFromId(number).then((response) => {
        setVotes(response.votes);
        setReviewByIdState(response);
      });
    });
  }, []);
  if (!reviewByIdState) {
    return <h2>loading...</h2>;
  }
  return (
    <div>
      <div className="reviewById">
        <section>
          <div className="reviewTitle">
            <h2>{reviewByIdState.title}</h2>
            <p>by</p>
            <h2>{reviewByIdState.owner}</h2>
          </div>
          <h5 className="voteText">
            {votes
              ? `Votes : ${votes}`
              : "Sorry vote failed, please refresh the page"}
          </h5>
          <button
            className="vote"
            disabled={pressed}
            onClick={() => {
              setPressed(true);
              setVotes(votes + 1);
              patchPlusVote(reviewByIdState.review_id)
                .then((response) => {
                  setPressed(false);
                })
                .catch((error) => {
                  setVotes(false);
                });
            }}
          >
            vote
          </button>
        </section>
        <img src={reviewByIdState.review_img_url} alt="shove here"></img>
        <p className="reviewBody">{reviewByIdState.review_body}</p>
      </div>
      <form></form>
      <ul className="commentsList">
        {reviewComments.map((comment) => {
          return <ReviewCommentCard comment={comment} />;
        })}
      </ul>
    </div>
  );
}

export default ReviewById;
