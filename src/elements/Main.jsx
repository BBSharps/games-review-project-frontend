import { Routes, Route } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewById from "./review_by_id";
import Home from "./Home";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path=":category" element={<Reviews />} />
        <Route path="/:category/:id" element={<ReviewById />} />
      </Routes>
    </main>
  );
}

export default Main;
