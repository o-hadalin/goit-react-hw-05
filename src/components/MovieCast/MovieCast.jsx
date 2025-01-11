import { Link } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = ({ movie }) => {
const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450?text=No+Poster&font=roboto';

  return (
    <div className={styles.card}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : PLACEHOLDER_IMAGE}
        alt={movie.title}
        className={styles.poster}
      />
      <h2 className={styles.title}>{movie.title}</h2>
      <Link to={`/movies/${movie.id}`} className={styles.detailsLink}>
        View Details
      </Link>
    </div>
  );
};

export default MovieCast;
