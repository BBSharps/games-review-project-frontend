function ReviewCommentCard({ comment }) {
  const key = comment.comment_id;
  return (
    <li className="reviewCommentCard" key={key}>
      <h3>{comment.author}</h3>
      <p>{comment.body}</p>
    </li>
  );
}

export default ReviewCommentCard;
