import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviews } from "../utility/axios-request";
import ReviewCard from "./reviews_li_card";

function Reviews() {
  const [reviewState, setReviewState] = useState([]);
  useEffect(() => {
    getReviews().then((response) => {
      setReviewState(response);
    });
  }, []);
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

export default Reviews;
