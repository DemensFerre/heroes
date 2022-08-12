const heroesWrapper = document.querySelector(".heroes .wrapper");

const getHeroes = async () => {
  const response = await fetch("./dbHeroes.json");
  const data = await response.json();
  renderCard(data);
};

const renderCard = (data) => {
  for (let item of data) {
    const cardTemplate = `
      <div class="card">
        <div class="card__image">
          <img src="${item.photo}" alt="" />
        </div>
        <div class="card__info">
          
        </div>
      </div>
    `;

    heroesWrapper.insertAdjacentHTML("beforeend", cardTemplate);
  }
};

getHeroes();
