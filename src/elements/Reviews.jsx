import { useState, useEffect } from "react";
import { getReviews } from "../utility/axios-request";
import ReviewCard from "./reviews_li_card";

function Reviews() {
  const [reviewState, setReviewState] = useState(false);
  useEffect(() => {
    getReviews().then((response) => {
      setReviewState(response);
    });
  }, []);
  if (!reviewState) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <ul className="reviewsList">
          {reviewState.map((review) => {
            return <ReviewCard review={review} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Reviews;
