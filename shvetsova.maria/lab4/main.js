import {Movie} from './model.js';

const STORAGE_KEY = 'movies';

function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

function loadMovies() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  const plainObjects = JSON.parse(raw);

  return plainObjects.map(
    (object) => new Movie(object.title, object.director, object.actors),
  );
}

const DELAY = 500;

function addMovieAsync(movies, title, director) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = [...movies, new Movie(title, director)];
      resolve(updated);
    }, DELAY);
  });
}

function removeMovieAsync(movies, title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = movies.filter((movie) => movie.title !== title);
      resolve(updated);
    }, DELAY);
  });
}

function addActorAsync(movies, movieTitle, actor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = movies.find((m) => m.title === movieTitle);
      if (movie) {
        movie.addActor(actor);
      }

      resolve(movies);
    }, DELAY);
  });
}

function removeActorAsync(movies, movieTitle, actor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = movies.find((m) => m.title === movieTitle);
      if (movie) {
        movie.removeActor(actor);
      }

      resolve(movies);
    }, DELAY);
  });
}

let movies = loadMovies() || [
  new Movie('Матрица', 'Вачовски', ['Киану Ривз', 'Керри-Энн Мосс']),
];

const form = document.querySelector('[data-testid="entity-form"]');
const titleInput = document.querySelector('[data-testid="entity-title-input"]');
const directorInput = document.querySelector(
  '[data-testid="entity-director-input"]',
);
const listContainer = document.querySelector('[data-testid="entity-list"]');

function rerender() {
  listContainer.innerHTML = '';

  for (const movie of movies) {
    const card = renderMovieCard(movie);
    listContainer.appendChild(card);
  }
}

function renderMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.setAttribute('data-testid', 'entity-card');

  const title = document.createElement('h3');
  title.textContent = movie.title;
  card.appendChild(title);

  const director = document.createElement('p');
  director.textContent = `Режиссёр: ${movie.director}`;
  card.appendChild(director);

  const actorList = document.createElement('ul');
  actorList.className = 'actor-list';

  for (const actor of movie.actors) {
    const li = document.createElement('li');
    li.textContent = actor;

    const removeActorBtn = document.createElement('button');
    removeActorBtn.textContent = '✕';
    removeActorBtn.addEventListener('click', () => {
      handleRemoveActor(movie.title, actor);
    });
    li.appendChild(removeActorBtn);

    actorList.appendChild(li);
  }
  card.appendChild(actorList);

  const actions = document.createElement('div');
  actions.className = 'movie-card-actions';

  const removeMovieBtn = document.createElement('button');
  removeMovieBtn.textContent = 'Удалить фильм';
  removeMovieBtn.setAttribute('data-testid', 'delete-entity');
  removeMovieBtn.addEventListener('click', () => {
    handleRemoveMovie(movie.title);
  });
  actions.appendChild(removeMovieBtn);

  card.appendChild(actions);

  const addActorForm = document.createElement('form');
  addActorForm.className = 'add-actor-form';

  const actorInput = document.createElement('input');
  actorInput.type = 'text';
  actorInput.placeholder = 'Имя актёра';
  actorInput.required = true;

  const addActorBtn = document.createElement('button');
  addActorBtn.type = 'submit';
  addActorBtn.textContent = 'Добавить актёра';

  addActorForm.appendChild(actorInput);
  addActorForm.appendChild(addActorBtn);

  addActorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = actorInput.value.trim();
    if (name) {
      handleAddActor(movie.title, name);
    }
  });

  card.appendChild(addActorForm);

  return card;
}

async function handleAddMovie(title, director) {
  movies = await addMovieAsync(movies, title, director);
  saveMovies(movies);
  rerender();
}

async function handleRemoveMovie(title) {
  movies = await removeMovieAsync(movies, title);
  saveMovies(movies);
  rerender();
}

async function handleAddActor(movieTitle, actorName) {
  movies = await addActorAsync(movies, movieTitle, actorName);
  saveMovies(movies);
  rerender();
}

async function handleRemoveActor(movieTitle, actorName) {
  movies = await removeActorAsync(movies, movieTitle, actorName);
  saveMovies(movies);
  rerender();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const director = directorInput.value.trim();
  if (title && director) {
    handleAddMovie(title, director);
    titleInput.value = '';
    directorInput.value = '';
  }
});

rerender();
