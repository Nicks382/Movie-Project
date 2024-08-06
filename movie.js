// http://www.omdbapi.com/?apikey=4eb0fe7c&s=avengers
// http://img.omdbapi.com/?apikey=4eb0fe7c&type=movie
// api key = 4eb0fe7c

const form = document.querySelector('form');
const movieListElement = document.querySelector('.movies__list');
let movieData = {};
let query = "";

form.addEventListener('submit', (event) => {
    event.preventDefault();
    query = form.querySelector('input').value;
    getMovies(query);
});

function filterMovies(event) {
    sortMovies(event.target.value);
}

async function sortMovies(filter) {
    if (filter === 'Recent') {
        movieData.Search.sort((a, b) => 
            parseInt(b.Year) - parseInt(a.Year));
    }
    else if (filter === 'Oldest') {
        movieData.Search.sort((a, b) => 
            parseInt(a.Year) - parseInt(b.Year));
    }

    movieListElement.innerHTML = movieData.Search.map((movie) => {
        return movieHTML(movie);
       });
}


async function getMovies() {
   const movies = await fetch(`http://www.omdbapi.com/?apikey=4eb0fe7c&type=movie&s=${query}`);
   movieData = await movies.json();
   console.log(movieData)
   
   movieListElement.innerHTML = movieData.Search.map((movie) => {
    return movieHTML(movie);
   }); 
}


function movieHTML(movie) {
    return `
    <div class="movie__card">
        <div class="movie__img--wrapper">
        <img class="movie__img" src="${movie.Poster}">
        </div>
        <div class="movie__info">
            <div class="movie__title">
                ${movie.Title}
            </div>
            <div class="movie-year">
                ${movie.Year}
            </div>
        </div>
    </div>
    `;
}


