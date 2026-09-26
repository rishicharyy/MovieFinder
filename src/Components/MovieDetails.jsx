import "./MovieDetails.css";

function MovieDetails({ movie, onBack }) {
  return (
    <div className="movie-details">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="details-header">

        <div className="details-poster">
          {movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="poster-placeholder">
              Poster Unavailable
            </div>
          )}
        </div>

        <div className="details-info">

          <h1 id="movie-title">{movie.Title}</h1>

          <div className="details-meta">
            <span>{movie.Rated}</span>
            <span>{movie.Released}</span>
            <span>{movie.Type}</span>
            <span>{movie.Runtime}</span>
          </div>

          <p className="details-genre">
            {movie.Genre}
          </p>

          <div className="imdb-rating">
            <strong>IMDb</strong>
            <span>{movie.imdbRating}</span>
            <span>({movie.imdbVotes} votes)</span>
          </div>

        </div>

      </div>


      <div className="details-content">

        <div className="details-plot">
          <h2>Plot</h2>
          <p>{movie.Plot}</p>
        </div>

        <div className="details-credits">
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
        </div>

        <div className="details-ratings">
          <h2>Other Ratings</h2>

          {movie.Ratings && movie.Ratings.map((rating) => {
            return (
              <p key={rating.Source}>
                <strong>{rating.Source}:</strong> {rating.Value}
              </p>
            );
          })}
        </div>

        <a
          className="imdb-link"
          href={`https://www.imdb.com/title/${movie.imdbID}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on IMDb ↗
        </a>

      </div>

    </div>
  );
}

export default MovieDetails;