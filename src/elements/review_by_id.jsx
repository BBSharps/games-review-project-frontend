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
  const [numberOfVotes, setNumberOfVotes] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    patchPlusVote(number, votes).then((response) => {
      setNumberOfVotes(response.votes);
      setVotes(response.votes);
      setPressed(false);
      setVotes(0);
    });
  }, [numberOfVotes]);
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
      <div>
        <div className="reviewById">
          <section>
            <div className="reviewTitle">
              <h2>{reviewByIdState.title}</h2>
              <p>by</p>
              <h2>{reviewByIdState.owner}</h2>
            </div>
            <h5 className="voteText">Votes : {numberOfVotes}</h5>
            <button
              className="vote"
              disabled={pressed}
              onClick={() => {
                setPressed(true);
                setNumberOfVotes(numberOfVotes + 1);
                setVotes(1);
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
}

export default ReviewById;
