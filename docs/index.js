// Smooth Scrolling
document.querySelectorAll(".scroll-to-section").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Modal functions
function openModal(service) {
  document.getElementById("modalTitle").innerText = `Booking: ${service}`;
  document.getElementById("bookingModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}
