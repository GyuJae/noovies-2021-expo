// baseURL: "https://api.themoviedb.org/3/",
//     params: {
//       api_key: "962cebc1820ada99a807125b7f1fdcbf",
//       language: "en-US",
//       page: pageNum,
//     },
const API_KEY = "962cebc1820ada99a807125b7f1fdcbf";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

const search = ({ queryKey }: { queryKey: any }) => {
  const [_, query] = queryKey;
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
  ).then((res) => res.json());
};

const detail = ({ queryKey }: { queryKey: any }) => {
  const [_, query] = queryKey;
  return fetch(
    `${BASE_URL}/movie/${query}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
  ).then((res) => res.json());
};

const images = ({ queryKey }: { queryKey: any }) => {
  const [_, query] = queryKey;
  return fetch(`${BASE_URL}/movie/${query}/images?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};

export const movieApis = {
  trending,
  upcoming,
  nowPlaying,
  search,
  detail,
  images,
};
