import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ReviewById({ reviewState, setReviewState }) {
  const reviewId = useParams();
  const number = Number(reviewId.id);
  useEffect(() => {
    axios
      .get(`https://games-review-hosting.onrender.com/api/reviews/${number}`)
      .then((response) => {
        setReviewState(response.data.reviewId);
      });
  }, []);

  return (
    <div className="reviewById">
      <section>
        <h2>{reviewState.title}</h2>
        <p>by</p>
        <h2>{reviewState.owner}</h2>
      </section>
      <img src={reviewState.review_img_url} alt="shove here"></img>
      <p className="reviewBody">{reviewState.review_body}</p>
    </div>
  );
}

export default ReviewById;
