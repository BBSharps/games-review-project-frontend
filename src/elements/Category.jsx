import { useParams } from "react-router-dom";
import ReviewCard from "./reviews_li_card";

function Category({ reviewState, setReviewState }) {
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

export default Category;
