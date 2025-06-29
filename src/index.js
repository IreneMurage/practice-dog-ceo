console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  const dogImageContainer = document.getElementById("dog-image-container");
  const breedList = document.getElementById("dog-breeds");
  const dropdown = document.getElementById("breed-dropdown");
  let allBreeds = [];

  fetch(imgUrl)
    .then(res => res.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Dog image";
        img.style.width = "200px";
        img.style.margin = "10px";
        dogImageContainer.appendChild(img);
      });
    });

  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    });

  function renderBreeds(breeds) {
    breedList.innerHTML = ""; 
    breeds.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        li.style.color = "teal";
      });

      breedList.appendChild(li);
    });
  }

  dropdown.addEventListener("change", (e) => {
    const selectedLetter = e.target.value;
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
});
