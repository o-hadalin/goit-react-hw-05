import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => (
  <div className={styles.card}>
    <img src={movie.poster} alt={movie.title} className={styles.poster} />
    <h3 className={styles.title}>{movie.title}</h3>
    <Link to={`/movies/${movie.id}`} className={styles.detailsLink}>
      More details
    </Link>
  </div>
);

export default MovieCard;
