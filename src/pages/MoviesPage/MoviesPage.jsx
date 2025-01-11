import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { fetchMoviesByKeyword } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast'; 
import Loader from '../../components/Loader/Loader'; 
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams();

  const validationSchema = Yup.object({
    query: Yup.string()
      .min(1, '1 character min')
      .required('Required field'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true); 
      const { query } = values;
      setSearchParams({ query }); 
      const results = await fetchMoviesByKeyword(query);
      setMovies(results);
      setError(null);
      resetForm();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const query = searchParams.get('query'); 
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true); 
          const results = await fetchMoviesByKeyword(query);
          setMovies(results);
          setError(null);
        } catch (err) {
          setError('Failed to fetch movies.');
          console.error(err);
        } finally {
          setLoading(false); 
        }
      };
      fetchMovies();
    }
  }, [searchParams]); 

  return (
    <div className={styles.container}>
      <h1>Search for movies</h1>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field
              name="query"
              type="text"
              placeholder="Enter the movie title"
              className={styles.input}
            />
            {errors.query && touched.query && (
              <div className={styles.error}>{errors.query}</div>
            )}
            <button type="submit" className={styles.button}>
              Search
            </button>
          </Form>
        )}
      </Formik>
      {loading && <Loader />} {}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 ? (
        <div className={styles.movieList}>
          {movies.map(movie => (
            <MovieCast key={movie.id} movie={movie} /> 
          ))}
        </div>
      ) : (
        !loading && <p className={styles.noMovies}>No movies found</p>
      )}
    </div>
  );
};

export default MoviesPage;
