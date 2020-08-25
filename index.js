window.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector("#navbar-burger");
  const menu = document.querySelector("#navbar-menu");
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  const description = document.querySelector('input[name="description"]');
  const location = document.querySelector('input[name="location"]');
  const fullTime = document.querySelector('input[name="full_time"]');
  const searchBtn = document.querySelector('input[value="Search"]');
  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let searchParams = new URLSearchParams();
    if (description.value !== "") {
      searchParams.append("description", description.value);
    }
    if (location.value !== "") {
      searchParams.append("location", location.value);
    }
    if (fullTime.checked) {
      searchParams.append("full_time", "on");
    }
    searchUrl =
      "https://still-spire-37210.herokuapp.com/positions.json?" +
      searchParams.toString();

    const response = await fetch(searchUrl);
    const posts = await response.json();
    console.log(posts);
    let template = document.querySelector("template");
    let table = document.querySelector("#job-pannel");
    table.innerHTML = "";
    let itemTitle = template.content.querySelector("h4>a");
    let itemCompany = template.content.querySelector(".company");
    let itemLocation = template.content.querySelector(".location");
    let itemFulltime = template.content.querySelector(".fulltime");
    posts.forEach((post) => {
      itemTitle.textContent = post.title;
      itemCompany.textContent = post.company;
      itemLocation.textContent = post.location;
      itemFulltime.textContent = post.type;
      let clone = document.importNode(template.content, true);
      table.appendChild(clone);
    });
  });
});
