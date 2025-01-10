import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { fetchMoviesByKeyword } from '../../services/api'; 
import styles from './MoviesPage.module.css';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();


  const validationSchema = Yup.object({
    query: Yup.string()
      .min(1, '1 character min')
      .required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { query } = values;
      setSearchParams({ query });
      const results = await fetchMoviesByKeyword(query);
      setMovies(results);
      setError(null);
      resetForm();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };
  
  useEffect(() => {
    const query = searchParams.get('query'); // Отримуємо значення параметра
    if (query) {
      (async () => {
        try {
          const results = await fetchMoviesByKeyword(query);
          setMovies(results);
          setError(null);
        } catch (err) {
          setError('Failed to fetch movies.');
          console.error(err);
        }
      })();
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
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
