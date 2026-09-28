export class Movie {
  constructor(title, director, actors = []) {
    this.title = title;
    this.director = director;
    this.actors = actors;
  }

  addActor(name) {
    this.actors.push(name);
  }

  removeActor(name) {
    this.actors = this.actors.filter((actor) => actor !== name);
  }

  get castSize() {
    return this.actors.length;
  }
}

export function groupMoviesByDirector(movies) {
  const groups = {};

  for (const movie of movies) {
    if (!groups[movie.director]) {
      groups[movie.director] = [];
    }

    groups[movie.director].push(movie);
  }

  return groups;
}

export function getUniqueActors(movies) {
  const uniqueActors = new Set();

  for (const movie of movies) {
    for (const actor of movie.actors) {
      uniqueActors.add(actor);
    }
  }

  return Array.from(uniqueActors);
}

export function groupMoviesByCastSize(movies) {
  const groups = new Map();

  for (const movie of movies) {
    const size = movie.castSize;

    if (!groups.has(size)) {
      groups.set(size, []);
    }

    groups.get(size).push(movie);
  }

  return groups;
}

export function findMoviesByActor(movies, actorName) {
  return movies.filter((movie) => movie.actors.includes(actorName));
}

export function getMovieTitles(movies) {
  return movies.map((movie) => movie.title);
}
