function ReviewCommentCard({ comment }) {
  const commentKey = comment.comment_id;
  return (
    <li key={commentKey} className="reviewCommentCard">
      <h3>{comment.author}</h3>
      <p>{comment.body}</p>
    </li>
  );
}

export default ReviewCommentCard;
