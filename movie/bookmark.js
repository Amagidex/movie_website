const allMovies =  JSON.parse(localStorage.getItem('movies'));
const movieElement = document.getElementById('movies');
const image_url= `https://image.tmdb.org/t/p/w500`


allMovies.forEach(movie => {

    const movieCard = document.createElement("div")
    movieCard.className='movie_card'

    movieCard.innerHTML=`
        <img  src='${image_url}${movie.backdrop_path || movie.poster_path}' />
        <a href='./details.html?id=${movie.id}&type=${movie.media_type}' >${movie.title || movie.original_title || movie.original_name  } </a>
    
    `

    const removeBookmark = document.createElement('button')

    removeBookmark.innerHTML='Remove'
    removeBookmark.onclick = ()=>{
        removeFromBookmark(movie);
    }

    movieCard.appendChild(removeBookmark)


    movieElement.append(movieCard)})


    function removeFromBookmark (movie){
        console.log("removeFromBookmark")
        const getMovies = JSON.parse(localStorage.getItem('movies'));

        const filteredMovies = getMovies.filter((elem) => elem.id !== movie.id)

        

        const toJson = JSON.stringify(filteredMovies);


        localStorage.setItem('movies',toJson);

        location.reload();
    }