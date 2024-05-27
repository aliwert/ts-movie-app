const APIURL: string =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH: string = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI: string =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main: HTMLElement = document.getElementById("main");
const form: HTMLElement = document.getElementById("form");
const search: HTMLInputElement = document.getElementById(
  "search"
) as HTMLInputElement;

getMovies(APIURL);

async function getMovies(url: string): Promise<void> {
  const resp: Response = await fetch(url);
  const respData: any = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies: any[]): void {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl: HTMLElement = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
  <img src="${IMGPATH + poster_path}" alt="${title}"/>
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
  </div> 
  <div class="overview">
    <h2>Overview:</h2>
    ${overview}
  </div>
`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote: number): string {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm: string = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
