const stars = document.querySelectorAll(".star");
const averageRatingEl = document.getElementById("averageRating");
const totalRatingsEl = document.getElementById("totalRatings");
const ratingMessage = document.getElementById("ratingMessage");
const reviewText = document.getElementById("reviewText");
const submitReviewBtn = document.getElementById("submitReview");
const reviewsList = document.getElementById("reviewsList");

let selectedRating = 0;

// Load from localStorage or start empty
let ratingsData = JSON.parse(localStorage.getItem("ratings")) || [];

/* ---------------- STAR RATING ---------------- */
stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.value);

        stars.forEach(s => {
            s.classList.remove("active");
            if (Number(s.dataset.value) <= selectedRating) {
                s.classList.add("active");
            }
        });

        ratingMessage.textContent =
            `You selected ${selectedRating} star${selectedRating > 1 ? "s" : ""}`;
    });
});

/* ---------------- SUBMIT REVIEW ---------------- */
submitReviewBtn.addEventListener("click", () => {
    const comment = reviewText.value.trim();

    if (selectedRating === 0) {
        alert("Please select a rating first.");
        return;
    }

    const newReview = {
        rating: selectedRating,
        comment: comment,
        createdAt: Date.now()
    };

    ratingsData.push(newReview);

    // Save to localStorage
    localStorage.setItem("ratings", JSON.stringify(ratingsData));

    ratingMessage.textContent = "Thank you for your feedback!";
    reviewText.value = "";
    selectedRating = 0;

    stars.forEach(s => s.classList.remove("active"));

    loadRatings();
    loadReviews();
});

/* ---------------- LOAD RATINGS (AVERAGE) ---------------- */
function loadRatings() {
    let total = 0;
    let count = ratingsData.length;

    ratingsData.forEach(item => {
        total += Number(item.rating);
    });

    let average = count > 0 ? (total / count).toFixed(1) : 0;

    averageRatingEl.textContent = average;
    totalRatingsEl.textContent = count;
}

/* ---------------- LOAD REVIEWS ---------------- */
function loadReviews() {
    reviewsList.innerHTML = "";

    const sorted = [...ratingsData].sort((a, b) => b.createdAt - a.createdAt);

    sorted.forEach(data => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        reviewCard.innerHTML = `
            <div class="review-stars">
                ${"★".repeat(data.rating)}
            </div>
            <p>${data.comment || "No comment provided."}</p>
        `;

        reviewsList.appendChild(reviewCard);
    });
}

/* ---------------- INITIAL LOAD ---------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadRatings();
    loadReviews();
});
