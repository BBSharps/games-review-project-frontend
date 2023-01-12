import { useState } from "react";
import { postComment } from "../utility/axios-request";

function SubmitForm({
  setOptimisticComment,
  setNewCommentInput,
  optimisticComment,
  number,
  logUser,
  newCommentInput,
}) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      className="submitForm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        setNewCommentInput("");
        postComment(number, logUser, newCommentInput)
          .then((response) => {
            setOptimisticComment([response, ...optimisticComment]);
            setSubmitting(false);
          })
          .catch((error) => {
            setNewCommentInput("Sorry comment failed, please refresh the page");
          });
      }}
      id="newComment"
    >
      <h2>Submit a new comment as "{logUser}"</h2>
      {submitting ? (
        <p>sumbitting comment</p>
      ) : (
        <textarea
          value={newCommentInput}
          onInput={(event) => {
            setNewCommentInput(event.target.value);
          }}
        ></textarea>
      )}
      {newCommentInput !== "" ? (
        <button htmlFor="newComment" type="submit">
          Submit
        </button>
      ) : null}
    </form>
  );
}
export default SubmitForm;
