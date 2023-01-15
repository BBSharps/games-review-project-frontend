import { useState, useEffect } from "react";
import { getReviewsWithSort } from "../utility/axios-request";
import ReviewCard from "./reviews_li_card";
import { useLocation } from "react-router-dom";
import SortBar from "./Sort-bar";

function Reviews() {
  const category = useLocation();
  const [sort, setSort] = useState(undefined);
  const [asc, setAsc] = useState(undefined);
  const [reviewsWithCategory, setReviewWithCategory] = useState([]);
  useEffect(() => {
    setReviewWithCategory([]);
    getReviewsWithSort(category.pathname.slice(1), sort, asc)
      .then((response) => {
        setReviewWithCategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, sort, asc]);
  if (reviewsWithCategory.length === 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <SortBar sort={sort} setSort={setSort} setAsc={setAsc} asc={asc} />
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
