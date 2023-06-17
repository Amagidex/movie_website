const API_KEY = `e9e9a580a5ee6670b3a1d4565bef919c`
const series = document.getElementById("series")
const movies = document.getElementById('movies')
const moviePagination = document.querySelector('.movie_pagination')
const seriesPagination = document.querySelector('.series_pagination')
const form = document.forms['search']
const query = form['query']
const container = document.querySelector('.container')
let moviePage = location.href.split("=")[1] || 1
let seriesPage = 1

const image_url= `https://image.tmdb.org/t/p/w500`
const url =(remainingPart)=> `https://api.themoviedb.org/3/${remainingPart}&api_key=${API_KEY}`


const fetchData = async (rootElement, fetchType, page, paginationElement)=>{
    const res = await fetch(url(`discover/${fetchType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`));
    const data = await res.json();
    const allMovies =  data.results
    const pages = Array.from({length: 10}, (_, i) => i + 1)

    console.log(data)

    allMovies.forEach(movie => {

        const movieCard = document.createElement("div")
        movieCard.className='movie_card'

        movieCard.innerHTML=`
            <img  src='${image_url}${movie.backdrop_path}' />
            <a href='./details.html?id=${movie.id}&type=${fetchType}' >${movie.title || movie.original_title || movie.original_name  } </a>
        
        `

        // this is another change for git

        const bookmark = document.createElement("button")
        bookmark.innerHTML='Add bookmark'

        bookmark.onclick = () =>{
            addBookmark(movie);
            
        }

        movieCard.appendChild(bookmark)


        rootElement.append(movieCard)
        
    });

    pages.forEach((page)=>{
        const pageNumber = document.createElement('a')

        pageNumber.innerHTML =`${page}`
        pageNumber.href = `./?page=${page}`

        paginationElement.appendChild(pageNumber)
    })
}

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const res = await fetch(url(`search/multi?query=${query.value}&include_adult=false&language=en-US&page=1`));
    const data = await res.json();
    const allMovies =  data.results

    console.log(allMovies);
    container.innerHTML=""
    allMovies.forEach(movie => {

        const movieCard = document.createElement("div")
        movieCard.className='movie_card'

        movieCard.innerHTML=`
            <img  src='${image_url}${movie.backdrop_path || movie.poster_path}' />
            <a href='./details.html?id=${movie.id}&type=${movie.media_type}' >${movie.title || movie.original_title || movie.original_name  } </a>
        
        `


        container.append(movieCard)
        
    });


  

} )

fetchData(movies, 'movie', moviePage, moviePagination)
fetchData(series, 'tv', seriesPage, seriesPagination)

// search/multi?include_adult=false&language=en-US&page=1


function addBookmark (movie){
    const getDataInLs = localStorage.getItem('movies')
    const convertFromJson = JSON.parse(getDataInLs) || []
    const filteredMovies = convertFromJson.some((elem)=>elem.id == movie.id )
    if(!filteredMovies){
        convertFromJson.push(movie)
    }
    const covertToJson = JSON.stringify(convertFromJson)
    localStorage.setItem('movies', covertToJson)
}