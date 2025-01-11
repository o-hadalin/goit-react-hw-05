import { Link } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link to={`/movies/${movie.id}`} className={styles.link}>
        <img
          src={movie.poster || 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={movie.title}
          className={styles.poster}
        />
        <h3 className={styles.title}>{movie.title}</h3>
      </Link>
    </div>
  );
};

export default MovieCast;
