import axios from 'axios';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450?text=No+Poster&font=roboto';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGFhOTc0ZWI0NGU0MzFjZTE3ZDA1YjExZTk0YTVkYSIsIm5iZiI6MTczNjQ1MjE4Ny4wLCJzdWIiOiI2NzgwMjg1YTJiMjlhOTE4ZDA0ZTUwOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ig5jR_gbRAjbD8r-iaGeynVCKz3vWZdMptskIul9CZw';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchMoviesByKeyword = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE,
    }));
  } catch (error) {
    console.error('Error fetching movies by keyword:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const movie = response.data;
    return {
      id: movie.id,
      title: movie.title || movie.name,
      overview: movie.overview,
      genres: movie.genres.map(genre => genre.name),
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
