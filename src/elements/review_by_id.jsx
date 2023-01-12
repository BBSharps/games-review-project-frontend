import {
  getReviewsFromId,
  getCommentsFromId,
  patchPlusVote,
  getUsers,
  postComment,
} from "../utility/axios-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCommentCard from "./reviews_comment_card";

function ReviewById() {
  const reviewId = useParams();
  const number = Number(reviewId.id);
  const [votes, setVotes] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [reviewComments, setReviewComments] = useState([]);
  const [reviewByIdState, setReviewByIdState] = useState(false);
  const [logUser, setLogUser] = useState("guest");
  const [users, setUsers] = useState([]);
  const [optimisticComment, setOptimisticComment] = useState([]);
  useEffect(() => {
    getCommentsFromId(number).then((response) => {
      setReviewComments(response);
      getReviewsFromId(number).then((response) => {
        setVotes(response.votes);
        setReviewByIdState(response);
        getUsers().then((response) => {
          setUsers(response);
        });
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
      <form className="loginForm">
        <h2>Please select user to comment</h2>
        <select
          defaultValue="guest"
          onChange={(event) => {
            setLogUser(event.target.value);
          }}
          name="Users"
          id="users"
        >
          <option>guest</option>
          {users.map((user) => {
            return <option>{user.username}</option>;
          })}
        </select>
      </form>
      {logUser !== "guest" ? (
        <form
          className="submitForm"
          onSubmit={(event) => {
            event.preventDefault();
            postComment(number, logUser, newCommentInput)
              .then((response) => {
                setOptimisticComment([response, ...optimisticComment]);
              })
              .catch((error) => {
                setNewCommentInput(
                  "Sorry comment failed, please refresh the page"
                );
              });
            setNewCommentInput("");
          }}
          id="newComment"
        >
          <h2>Submit a new comment as "{logUser}"</h2>
          <input
            value={newCommentInput}
            onInput={(event) => {
              setNewCommentInput(event.target.value);
            }}
          ></input>
          <button htmlFor="newComment" type="submit">
            Submit
          </button>
        </form>
      ) : null}
      <ul className="commentsList">
        {optimisticComment.map((comment) => {
          return <ReviewCommentCard comment={comment} />;
        })}
        {reviewComments.map((comment) => {
          return <ReviewCommentCard comment={comment} />;
        })}
      </ul>
    </div>
  );
}

export default ReviewById;
