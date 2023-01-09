import { Routes, Route } from "react-router-dom";
import Category from "./Category";
import ReviewById from "./review_by_id";
import Home from "./Home";
import { useState, useEffect } from "react";
import axios from "axios";

function Main() {
  const [reviewState, setReviewState] = useState([]);
  useEffect(() => {
    axios
      .get("https://games-review-hosting.onrender.com/api/reviews")
      .then((response) => {
        setReviewState(response.data.reviews);
      });
  }, []);
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/all"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/strategy"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/hidden-roles"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/dexterity"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/push-your-luck"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/roll-and-write"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/deck-building"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route
          path="/engine-building"
          element={
            <Category
              reviewState={reviewState}
              setReviewState={setReviewState}
            />
          }
        />
        <Route path="/all/:id" element={<ReviewById />} />
        <Route path="/strategy/:id" element={<ReviewById />} />
        <Route path="/hidden-roles/:id" element={<ReviewById />} />
        <Route path="/dexterity/:id" element={<ReviewById />} />
        <Route path="/push-your-luck/:id" element={<ReviewById />} />
        <Route path="/roll-and-write/:id" element={<ReviewById />} />
        <Route path="/deck-building/:id" element={<ReviewById />} />
        <Route path="/engine-building/:id" element={<ReviewById />} />
      </Routes>
    </main>
  );
}

export default Main;
