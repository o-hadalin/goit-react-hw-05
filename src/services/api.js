import axios from 'axios';

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
        : null,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};
