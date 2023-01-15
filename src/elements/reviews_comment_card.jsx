import { deleteComment } from "../utility/axios-request";

function ReviewCommentCard({
  comment,
  logUser,
  setRemoveComment,
  setReviewComments,
  setOptimisticComment,
}) {
  return (
    <li className="reviewCommentCard">
      <section>
        <h3>{comment.author}</h3>
        <p>{comment.body}</p>
      </section>
      {logUser === comment.author ? (
        <button
          onClick={() => {
            setRemoveComment(comment.comment_id);
            deleteComment(comment.comment_id)
              .then((response) => {})
              .catch((error) => {
                setOptimisticComment([]);
                setReviewComments([
                  {
                    author: "Removal of comment failed",
                    body: "Please refresh",
                  },
                ]);
              });
          }}
        >
          Remove comment
        </button>
      ) : null}
    </li>
  );
}

export default ReviewCommentCard;
