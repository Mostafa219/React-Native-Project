import { preventSearchWords } from "./assests";

const BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  }
};

async function fetchFromTMDB(path, params = {}) {
  const url = new URL(BASE_URL + path);
  url.search = new URLSearchParams(params).toString();

  try {
    const res = await fetch(url, API_OPTIONS);

    if (!res.ok) {
      console.error('API Error:', res.status, await res.text());
      throw new Error('Failed to fetch data from TMDB API');
    }

    return res.json();
  } catch (error) {
    console.error('Fetch From TMDB Failed:', error);
    throw error;
  }
}

export async function getNowPlayingMovies(page = 1, language = 'en-US') {
  const path = '/movie/now_playing';
  const params = { language, page };
  const data = await fetchFromTMDB(path, params);
  return data;
}


export async function getMovieDetailsByID(id, language = 'en-US') {
  const path = `/movie/${id}`;
  const params = {
    language,
    append_to_response: 'credits,videos,recommendations,similar'
  };
  return fetchFromTMDB(path, params);
}

export async function searchByQuery(query = '', page = 1, language = 'en-US') {
  const isForbidden = query && preventSearchWords.includes(query.toLowerCase());
  const finalQuery = isForbidden || !query.trim() ? 'a' : query;

  const path = '/search/movie';
  const params = {
    query: finalQuery,
    page,
    language
  };

  return fetchFromTMDB(path, params);
}