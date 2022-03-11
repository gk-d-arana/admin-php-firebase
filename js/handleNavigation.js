$(document).ready(() => {

  document.querySelectorAll(".navigate-now").forEach((el) => {
    el.addEventListener("click", (e) => {
       
      //hide all divs
      document.querySelector(".home-div").classList.add("hidden");
      document.querySelector(".all-riders-div").classList.add("hidden");
      document.querySelector(".rejected-riders-div").classList.add("hidden");
      document.querySelector(".all-orders-div").classList.add("hidden");

      //show active one
      document.querySelector(`.${e.target.id}`).classList.remove("hidden");
      window.location.hash = e.target.id
      e.preventDefault()
        });
  });
});
