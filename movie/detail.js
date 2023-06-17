const rootElement = document.querySelector('.root')
const relatedDiv = document.getElementById('related')

const id  = location.href.split('=')[1].split("&")[0]
const type = location.href.split('=')[2]

const API_KEY = `e9e9a580a5ee6670b3a1d4565bef919c`


const image_url= `https://image.tmdb.org/t/p/w500`
const url =(remainingPart)=> `https://api.themoviedb.org/3/${remainingPart}&api_key=${API_KEY}`

const fetchData = async ()=>{
    const res = await fetch( url(`${type}/${id}?language=en-US'`))
    const movie = await res.json();

    // console.log(movie)
    rootElement.innerHTML=`
        <h1>${movie.title || movie.original_title || movie.original_name  } </h1>
        <img src='${image_url}${movie.poster_path}'>
        <p>${movie.overview}</p>
        <p>Genres: ${movie.genres.map(genre=>` ${genre.name}`)}</p>
        <p> Language: ${movie.spoken_languages?.map((lang)=>` ${lang?.english_name}`)        }</p>
    `
}

const fetchRelated = async ()=>{
    const res =await  fetch( url(`${type}/${id}/similar?language=en-US'`))
    const data = await res.json()

    console.log(data)
    const allMovies =  data.results

    console.log(allMovies)

    allMovies.forEach(movie => {

        const movieCard = document.createElement("div")
        movieCard.className='movie_card'

        movieCard.innerHTML=`
            <img  src='${image_url}${movie.backdrop_path}' />
            <a href='./details.html?id=${movie.id}&type=${type}' >${movie.title || movie.original_title || movie.original_name  } </a>
        
        `


        relatedDiv.append(movieCard)
        
    });
}

fetchRelated()
fetchData()