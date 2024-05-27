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

// Asynchronous function to fetch movies based on the main API URL
getMovies(APIURL);

// Function to make a GET request to the specified URL and then process the received data
async function getMovies(url: string): Promise<void> {
  const resp: Response = await fetch(url); // Fetch data from the API
  const respData: any = await resp.json(); // Parse data as JSON

  showMovies(respData.results); // Show the parsed data
}

// Function to display movies in the HTML content
function showMovies(movies: any[]): void {
  main.innerHTML = ""; // Clear previous movie list
  movies.forEach((movie) => {
    // For each movie
    const { poster_path, title, vote_average, overview } = movie; // Extract necessary data

    // Create a new HTML element for the movie
    const movieEl: HTMLElement = document.createElement("div");
    movieEl.classList.add("movie");

    // Populate the HTML element with movie information
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

    main.appendChild(movieEl); // Add the movie element to the main container
  });
}

// Function to determine the CSS class based on the movie rating
function getClassByRate(vote: number): string {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Event listener for the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const searchTerm: string = search.value; // Get the search term from the input field

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm); // Fetch movies based on the search term
    search.value = ""; // Clear the search input field
  }
});
