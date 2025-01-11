import { Link } from 'react-router-dom';
import styles from './MovieCast.module.css';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450?text=No+Poster&font=roboto';

const MovieCast = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img
        src={movie.poster || PLACEHOLDER_IMAGE} // Використовуй поле `poster`
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
