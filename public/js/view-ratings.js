const averageRatingEl = document.getElementById("averageRating");
const totalRatingsEl = document.getElementById("totalRatings");
const reviewsList = document.getElementById("reviewsList");

let ratingsData = [];

/* ---------------- FETCH ALL RATINGS FROM BACKEND ---------------- */
async function fetchRatings() {
  try {
    const res = await fetch("/api/ratings");
    ratingsData = await res.json();

    loadRatings();
    loadReviews();
  } catch (err) {
    console.error("Error loading ratings:", err);
  }
}

/* ---------------- CALCULATE & DISPLAY AVERAGE ---------------- */
function loadRatings() {
  const total = ratingsData.reduce((sum, r) => sum + Number(r.rating), 0);
  const avg = ratingsData.length ? (total / ratingsData.length).toFixed(1) : 0;

  averageRatingEl.textContent = avg;
  totalRatingsEl.textContent = ratingsData.length;
}

/* ---------------- DISPLAY ALL REVIEWS ---------------- */
function loadReviews() {
  reviewsList.innerHTML = "";

  [...ratingsData]
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach(data => {
      const div = document.createElement("div");
      div.classList.add("review-card");

      div.innerHTML = `
        <div class="review-stars">${"★".repeat(data.rating)}</div>
        <p>${data.comment || "No comment provided."}</p>
        <small>${new Date(data.createdAt).toLocaleString()}</small>
      `;

      reviewsList.appendChild(div);
    });
}

/* ---------------- INIT ---------------- */
window.addEventListener("DOMContentLoaded", fetchRatings);
