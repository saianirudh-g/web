const averageRatingEl = document.getElementById("averageRating");
const totalRatingsEl = document.getElementById("totalRatings");
const reviewsList = document.getElementById("reviewsList");

// CHANGE THIS TO YOUR BACKEND URL
const BACKEND_URL = "https://backend-gamma-one-95.vercel.app/api/ratings";

async function fetchRatings() {
  try {
    const res = await fetch(BACKEND_URL);
    const ratings = await res.json();

    loadRatings(ratings);
    loadReviews(ratings);
  } catch (err) {
    console.error("Error fetching ratings:", err);
  }
}

function loadRatings(ratings) {
  const total = ratings.reduce((sum, r) => sum + Number(r.rating), 0);
  const avg = ratings.length ? (total / ratings.length).toFixed(1) : 0;

  averageRatingEl.textContent = avg;
  totalRatingsEl.textContent = ratings.length;
}

function loadReviews(ratings) {
  reviewsList.innerHTML = "";

  ratings
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach(r => {
      const div = document.createElement("div");
      div.classList.add("review-card");

      div.innerHTML = `
        <div class="review-stars">${"★".repeat(r.rating)}</div>
        <p>${r.comment || "No comment provided."}</p>
        <small>${new Date(r.createdAt).toLocaleString()}</small>
      `;

      reviewsList.appendChild(div);
    });
}

window.addEventListener("DOMContentLoaded", fetchRatings);
