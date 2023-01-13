import axios from "axios";

const api = axios.create({
  baseURL: "https://games-review-hosting.onrender.com/api",
});

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
export const getUsers = () => {
  return api.get(`users`).then((response) => {
    return response.data.users;
  });
};
export const postComment = (id, user, text) => {
  return api
    .post(`reviews/${id}/comments`, {
      userName: user,
      body: text,
    })
    .then((response) => {
      return response.data.comment;
    });
};
export const getReviewsWithCategory = (category) => {
  return category === "reviews"
    ? api.get("reviews").then((response) => {
        return response.data.reviews;
      })
    : api
        .get("reviews", { params: { category: category } })
        .then((response) => {
          return response.data.reviews;
        });
};
export const getCategories = () => {
  return api.get("categories").then((response) => {
    return response.data.categories;
  });
};
