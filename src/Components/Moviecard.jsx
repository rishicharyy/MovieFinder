import "./Moviecard.css";



function Moviecard({movies,onMovieClick}){

    return(
    <div className="movie-grid">
        {movies.map((movie)=>{
            return(
            <div className="movie-card" key={movie.imdbID} onClick={()=>onMovieClick(movie)} >
                   <div className="movie-visual"> 
                    {movie.Poster !=="N/A"? (<img className="movie-poster" src={movie.Poster} alt={movie.Title}></img>):(<div className="poster-placeholder"><h3>"Poster Unavailable"</h3></div>) }            
                    <div className="movie-info-overlay">
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}<span>|</span>{movie.Type}</p>
                    </div>
                   </div> 
            </div>)
        })}


    </div>)
}
export default Moviecard