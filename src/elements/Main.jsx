import { Routes, Route } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewById from "./review_by_id";
import Home from "./Home";
import { useState, useEffect } from "react";
import { getReviews } from "../utility/axios-request";

function Main() {
  const [reviewState, setReviewState] = useState([]);
  useEffect(() => {
    getReviews().then((response) => {
      setReviewState(response);
    });
  }, []);
  return (
    <main>
      <Routes>
        <Route
          path="/*"
          element={
            <Reviews
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/reviews"
          element={
            <Reviews
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route path="/reviews/:id" element={<ReviewById />} />
      </Routes>
    </main>
  );
}

export default Main;
