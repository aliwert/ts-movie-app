// Define the main API URL to fetch popular movies sorted by popularity
const APIURL: string =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// Define the base URL for retrieving movie poster images
const IMGPATH: string = "https://image.tmdb.org/t/p/w1280";

// Define the API URL for searching movies based on a query
const SEARCHAPI: string =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// Get references to HTML elements in the document
const main: HTMLElement = document.getElementById("main");
const form: HTMLElement = document.getElementById("form");
const search: HTMLInputElement = document.getElementById(
  "search"
) as HTMLInputElement;

// Fetch movies when the page loads
getMovies(APIURL);

// Asynchronous function to fetch movies from the specified URL
async function getMovies(url: string): Promise<void> {
  // Send a GET request to the API URL and wait for the response
  const resp: Response = await fetch(url);
  // Parse the response data as JSON
  const respData: any = await resp.json();

  // Display the retrieved movies
  showMovies(respData.results);
}

// Function to display movies in the HTML content
function showMovies(movies: any[]): void {
  // Clear the previous movie list
  main.innerHTML = "";
  // Iterate over each movie in the array
  movies.forEach((movie) => {
    // Extract necessary data for each movie
    const { poster_path, title, vote_average, overview } = movie;

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

    // Add the movie element to the main container
    main.appendChild(movieEl);
  });
}

// Function to determine the CSS class based on the movie rating
function getClassByRate(vote: number): string {
  if (vote >= 8) {
    return "green"; // Return "green" class for high-rated movies
  } else if (vote >= 5) {
    return "orange"; // Return "orange" class for moderately-rated movies
  } else {
    return "red"; // Return "red" class for low-rated movies
  }
}

// Event listener for the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const searchTerm: string = search.value; // Get the search term from the input field

  if (searchTerm) {
    // Fetch movies based on the search term
    getMovies(SEARCHAPI + searchTerm);
    // Clear the search input field
    search.value = "";
  }
});
