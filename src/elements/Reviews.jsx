import { useState, useEffect } from "react";
import { getReviewsWithCategory } from "../utility/axios-request";
import ReviewCard from "./reviews_li_card";
import { useLocation } from "react-router-dom";

function Reviews() {
  const category = useLocation();
  const [reviewsWithCategory, setReviewWithCategory] = useState([]);
  useEffect(() => {
    setReviewWithCategory([]);
    getReviewsWithCategory(category.pathname.slice(1))
      .then((response) => {
        setReviewWithCategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);
  if (reviewsWithCategory.length === 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <ul className="reviewsList">
        {reviewsWithCategory.map((review) => {
          return (
            <ReviewCard
              key={"cat" + reviewsWithCategory.indexOf(review)}
              review={review}
              category={category.pathname}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Reviews;
