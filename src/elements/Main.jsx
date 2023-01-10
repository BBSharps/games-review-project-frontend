import { Routes, Route } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewById from "./review_by_id";
import Home from "./Home";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<Reviews />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:id" element={<ReviewById />} />
      </Routes>
    </main>
  );
}

export default Main;
