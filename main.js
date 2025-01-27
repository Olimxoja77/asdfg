let btn = document.querySelector(".light");
let body = document.querySelector("body");
let inp = document.querySelector("#searchInput");
let btn2 = document.querySelector(".btn2");
let sortSelect = document.querySelector("#sortSelect");
let div = document.querySelector(".box");
let countries = [];
let img =document.querySelector("img")
img.style.display = "block"

btn.addEventListener('click', () => {
  body.classList.toggle('dark');
});


fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    countries = data;
    renderCountries(countries); 
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
    img.style.display ="none"
function renderCountries(countriesToDisplay) {
  div.innerHTML = ''; 
  countriesToDisplay.forEach((item) => {
    div.innerHTML += `
      <div>
        <img src="${item.flags.png}" alt="${item.name.common} flag">
        <h1>${item.name.common}</h1>
      </div>
    `;
  });
}


btn2.addEventListener("click", () => {
  let searchTerm = inp.value.toLowerCase();
  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
});


sortSelect.addEventListener("change", () => {
  let sortedCountries;
  if (sortSelect.value === "asc") {
    sortedCountries = [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  } else if (sortSelect.value === "desc") {
    sortedCountries = [...countries].sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
  }
  renderCountries(sortedCountries);
});
