function ReviewCommentCard({ comment }) {
  return (
    <li className="reviewCommentCard">
      <h3>{comment.author}</h3>
      <p>{comment.body}</p>
    </li>
  );
}

export default ReviewCommentCard;
