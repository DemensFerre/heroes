// todo: использовать bootstrap в этом проекте
// todo: сделать эффект 3D карточки

const heroesWrapper = document.querySelector(".heroes .wrapper");

const getHeroes = async () => {
  const response = await fetch("./dbHeroes.json");
  const data = await response.json();
  renderCard(data);
  cardFlip();
};

const renderCard = (data) => {
  for (let item of data) {
    const cardTemplate = `
    <div class="card">
      <div class="card-body">
        <div class="card__img">
          <img class="card-img-top" src="${item.photo}" alt="" />
        </div>
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
          <span class="card-text__title">Вид</span>
          <span class="card-text__info">${item.species}</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Пол</span>
          <span class="card-text__info">${item.gender}</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Статус</span>
          <span class="card-text__info">${item.status}</span>
        </p>
        <a href="#" class="card__btn btn">Узнать больше</a>
      </div>
      <div class="card-back">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
          <span class="card-text__title">Настоящее имя:</span>
          <span class="card-text__info">${
            item.realName ? item.realName : "ничего не найдено"
          }</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Гражданство:</span>
          <span class="card-text__info">${
            item.citizenship ? item.citizenship : "ничего не найдено"
          }</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Год рождения:</span>
          <span class="card-text__info">${
            item.birthDay ? item.birthDay : "ничего не найдено"
          }</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Год смерти:</span>
          <span class="card-text__info">${
            item.deathDay ? item.deathDay : "ничего не найдено"
          }</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Актер:</span>
          <span class="card-text__info">${
            item.actors ? item.actors : "ничего не найдено"
          }</span>
        </p>
        <p class="card-text">
          <span class="card-text__title">Фильмы:</span>
          <span class="card-text__info">${
            item.movies ? item.movies.join(" | ") : "ничего не найдено"
          }</span>
        </p>
        <a href="#" class="card__btn btn">Вернуться обратно</a>
      </div>
    </div>
    `;

    console.log();

    heroesWrapper.insertAdjacentHTML("beforeend", cardTemplate);
  }
};

const cardFlip = () => {
  heroesWrapper.addEventListener("click", (e) => {
    if (e.target.closest(".card__btn")) {
      e.preventDefault();
      e.target.closest(".card").classList.toggle("card_active");
    }
  });
};

getHeroes();
