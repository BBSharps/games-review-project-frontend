import axios from "axios";

const api = axios.create({
  baseURL: "https://games-review-hosting.onrender.com/api",
});

export const getReviews = () => {
  return api.get("reviews").then((response) => {
    return response.data.reviews;
  });
};
export const getReviewsFromId = (id) => {
  return api.get(`reviews/${id}`).then((response) => {
    return response.data.reviewId;
  });
};
export const getCommentsFromId = (id) => {
  return api.get(`reviews/${id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const patchPlusVote = (id) => {
  return api
    .patch(`reviews/${id}`, {
      inc_votes: "1",
    })
    .then((response) => {
      return response.data.reviewVote;
    });
};
