import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';
const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450?text=No+Poster&font=roboto';


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchMovieDetails(movieId);
        setMovie(result);
        setError(null);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                : PLACEHOLDER_IMAGE}
            alt={movie.title}
            className={styles.poster}
          />
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
