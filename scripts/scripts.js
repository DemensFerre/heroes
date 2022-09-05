const heroesWrapper = document.querySelector(".heroes .wrapper");
const formSelect = document.querySelector(".form-select");

const start = async () => {
  const response = await fetch("./dbHeroes.json");
  const data = await response.json();
  renderOption(data);
  renderCard(data);
  cardFilter();
  cardFlip();
};

const renderOption = (data) => {
  const allMovies = [];
  let newArray = [];
  let optionTemplate;

  for (let item of data) {
    if (item.movies) {
      for (let movie of item.movies) {
        allMovies.push(movie);
      }
    }
  }

  newArray = Array.from(new Set(allMovies));

  for (let item of newArray) {
    optionTemplate = `<option value="${item.replace(
      / +|:+/g,
      ""
    )}">${item}</option>`;
    formSelect.insertAdjacentHTML("beforeend", optionTemplate);
  }
};

const renderCard = (data) => {
  let cardTemplate;
  data.forEach((item) => {
    cardTemplate = `
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
      <a href="#" class="card__btn card__btn_front btn">Узнать больше</a>
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
        <span class="card-text__info card-text__info_movies">${
          item.movies ? item.movies.join(" | ") : "ничего не найдено"
        }</span>
      </p>
      <a href="#" class="card__btn card__btn_back btn">Вернуться обратно</a>
    </div>
  </div>
  `;

    heroesWrapper.insertAdjacentHTML("beforeend", cardTemplate);
  });
};

const cardFlip = () => {
  const allCard = heroesWrapper.querySelectorAll(".card");

  heroesWrapper.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.closest(".card__btn_front")) {
      for (let card of allCard) {
        card.classList.remove("card_active");
      }
      e.target.closest(".card").classList.add("card_active");
    }

    if (e.target.closest(".card__btn_back")) {
      e.target.closest(".card").classList.remove("card_active");
    }
  });
};

const cardFilter = () => {
  const cards = document.querySelectorAll(".card");

  formSelect.addEventListener("change", (e) => {
    let option = formSelect.options[formSelect.selectedIndex];

    cards.forEach((item) => {
      const movies = item.querySelector(".card-text__info_movies");
      const optionRegExp = new RegExp(`${option.textContent}`);

      item.classList.remove("card_hide");

      if (!optionRegExp.test(movies.textContent)) {
        item.classList.add("card_hide");
      }

      if (formSelect.selectedIndex == 0) {
        item.classList.remove("card_hide");
      }
    });
  });
};

start();
