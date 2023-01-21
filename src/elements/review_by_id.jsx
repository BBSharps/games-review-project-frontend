import {
  getReviewsFromId,
  getCommentsFromId,
  patchPlusVote,
  getUsers,
} from "../utility/axios-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCommentCard from "./reviews_comment_card";
import LoginForm from "./Login-Form";
import SubmitForm from "./Submit-form";

function ReviewById() {
  const reviewId = useParams();
  const number = Number(reviewId.id);
  const [removeComment, setRemoveComment] = useState(undefined);
  const [votes, setVotes] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [reviewComments, setReviewComments] = useState([]);
  const [reviewByIdState, setReviewByIdState] = useState(false);
  const [logUser, setLogUser] = useState("guest");
  const [users, setUsers] = useState([]);
  const [optimisticComment, setOptimisticComment] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    getCommentsFromId(number)
      .then((response) => {
        setReviewComments(response);
      })
      .catch((error) => {
        setError(true);
      });
    getReviewsFromId(number)
      .then((response) => {
        setVotes(response.votes);
        setReviewByIdState(response);
      })
      .catch((error) => {
        setError(true);
      });
    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    setOptimisticComment(
      optimisticComment.filter((comment) => {
        return comment.comment_id !== removeComment;
      })
    );
    setReviewComments(
      reviewComments.filter((comment) => {
        return comment.comment_id !== removeComment;
      })
    );
  }, [removeComment]);
  if (error) {
    return <h2>Here be no review</h2>;
  }
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
              patchPlusVote(number)
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
      <LoginForm setLogUser={setLogUser} users={users} />
      {logUser !== "guest" ? (
        <SubmitForm
          setOptimisticComment={setOptimisticComment}
          setNewCommentInput={setNewCommentInput}
          optimisticComment={optimisticComment}
          number={number}
          logUser={logUser}
          newCommentInput={newCommentInput}
        />
      ) : null}
      <ul className="commentsList">
        {optimisticComment.map((comment) => {
          return (
            <ReviewCommentCard
              key={"plus" + optimisticComment.indexOf(comment)}
              comment={comment}
              logUser={logUser}
              setRemoveComment={setRemoveComment}
              setReviewComments={setReviewComments}
              setOptimisticComment={setOptimisticComment}
            />
          );
        })}
        {reviewComments.map((comment) => {
          return (
            <ReviewCommentCard
              key={reviewComments.indexOf(comment)}
              comment={comment}
              logUser={logUser}
              setRemoveComment={setRemoveComment}
              setReviewComments={setReviewComments}
              setOptimisticComment={setOptimisticComment}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewById;
