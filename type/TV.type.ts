type genre = {
  id: number;
  name: string;
};

type production_company = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

export interface ITV {
  name: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string | null;
  popularity: number;
  genre_ids: number[];
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  origin_country: string[];
  original_language: string;
  vote_count: number;
}

export interface ITVResponse {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export interface ITvDetail {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  genres: genre[];
  overview: string;
  poster_path: string;
  release_date?: string;
  runtime?: string;
  name: string;
  production_companies: production_company[];
  homepage?: string;
  videos?: any;
}

export interface ISearchTV {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}
