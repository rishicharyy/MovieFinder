import { useState,useEffect,useRef } from "react";
import MovieDetails from "./Components/MovieDetails";
import Moviecard from "./Components/Moviecard";
import "./App.css";
import logo from "./assets/favicon.png"

function App(){

const [searchTerm,setSearchTerm]=useState("");
const [movies,setMovies]=useState([]);
const [error,setError]=useState("");
const [movieClick,setMovieClick]=useState(null);
const [loading,setLoading]=useState(false);
const searchSectionRef = useRef(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  if(searchTerm.trim()===""){
    setError("Please enter the movie name");
    setMovies([]);
    setSearchTerm("");
    return;
  }
  setLoading(true);
  try{
  const ApiKey=import.meta.env.VITE_OMDB_API_KEY;
  const URL =`https://www.omdbapi.com/?apikey=${ApiKey}&s=${searchTerm}`;
  const response = await fetch(URL);
  const data = await response.json();
  setSearchTerm("");
  setError("");

  if (data.Response == "True"){
    setMovies(data.Search);
  }else{
    setMovies([]);
    setError(data.Error);
      }
  }catch(error){
    setMovies([]);
    setSearchTerm("");
    setError("Error!!Retry !!");
  }finally{
    setLoading(false);
  }

}
const HandleMovieClick= async(movie)=>{
setLoading(true);
setError("");
try{
  const ImdbID=movie.imdbID;
  const ApiKey=import.meta.env.VITE_OMDB_API_KEY;
  const URL=`https://www.omdbapi.com/?apikey=${ApiKey}&i=${ImdbID}&plot=full`;
  const response= await fetch(URL);
  const data= await response.json();
    
  if(data.Response==="True"){
    setMovieClick(data);
    window.history.pushState(
    { movie: data.imdbID },
    "",
    `?movie=${data.imdbID}`
  );
  }else{
    setMovieClick(null);
    setError(data.Error);
  }
  }catch(error){
    setMovieClick(null);
    setError("Error!!!  Try Again!");
      }finally{
      setLoading(false);
        }

}
  useEffect(() => {
  const handlePopState = () => {
    setMovieClick(null);
    setError("");
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
                  }, []);

const handleSearchNavigation = () => {
  if (movieClick) {
    window.history.back();
    return;
  }
  searchSectionRef.current?.scrollIntoView({
    behavior: "smooth"
  });
};

  return(
    <div className="app">
      <header className="site-header">

      <div className="logo">
        <span className="logo-title">search</span>
        <span><img className="logo-image"src={logo}></img></span>
      </div>

      <nav className="navigation">
        <a href="#search-section" onClick={handleSearchNavigation}>Home</a>
        <a href="#search-section" onClick={handleSearchNavigation}>Search</a>
      </nav>

    </header>
      {!movieClick&&(<section id="search-section" className="search-section" ref={searchSectionRef}>

        <h1>Find your movie ; )</h1>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        handleSubmit(e); // Pass the event object directly
                         }
                      }}
          />

          <button onClick={handleSubmit}>
           Search
          </button>

        </div>

      </section>)}

      {error&&<h1 className="error-message">{error}</h1>}
      <div>
        {movieClick?
        (loading?(<p className="loading-message">Loading Movie Details....</p>):(<MovieDetails movie={movieClick} onBack={()=>{window.history.back()}}/>)):
        (loading?(<p className="loading-message">Loading Movie....</p>):
        (movies.length > 0 &&<section className="movies-section"> <h2>Movies/Shows</h2><Moviecard movies={movies} onMovieClick={HandleMovieClick}/></section>))
        
        
        }
        
      </div>

    </div>
    
  )

}
export default App