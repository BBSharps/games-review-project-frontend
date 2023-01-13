import { Link } from "react-router-dom";

function ReviewCard({ review, category }) {
  return (
    <li>
      <Link to={`${category}/${review.review_id}`}>
        <h3>{review.title}</h3>
      </Link>
      <p>by</p>
      <h4>{review.owner}</h4>
      <div>
        <p>Votes:{review.votes}</p>
        <p>Comments:{review.comment_count}</p>
      </div>
    </li>
  );
}

export default ReviewCard;
