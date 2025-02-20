export interface Identifiable {
  id: number | string;
}

export interface INamedEntity {
  name: string;
}

export interface IGenre {
  id: number | string;
  name: string;
}

export interface IPropsType {
  img: string | undefined;
  id: number | string;
  title: string;
  releaseDate: string;
}

export interface ISearchProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  isMobile?: boolean;
}

export interface IFormValues {
  searchQuery: string;
}

export interface ImageEntity {
  poster_path: string | undefined;
  backdrop_path: string;
}

export interface ILanguage {
  english_name: string;
  iso_639_1: string;
  name: INamedEntity;
}

export interface ICountry {
  iso_3166_1: string;
  name: INamedEntity;
}

export interface IMovie extends ImageEntity {
  adult: boolean;
  genre_ids: number[];
  id: Identifiable;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieParams {
  api_key: string | undefined;
  page: string;
  query?: string;
  with_genres?: string;
}

export interface Genre extends INamedEntity {
  id: Identifiable;
}

export interface IProductionCompany extends INamedEntity {
  id: Identifiable;
  logo_path: string | null;
  origin_country: string;
}

export interface IVideo {
  id: Identifiable;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IFavorite extends IMovie {
  belongs_to_collection: null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: IProductionCompany[];
  production_countries: ICountry[];
  revenue: number;
  runtime: number;
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
  videos: {
    results: IVideo[];
  };
}

export interface ICollection extends Identifiable, ImageEntity {
  name: INamedEntity;
}

export interface IFavoriteContextValue {
  favorites: IFavorite[];
  setFavorites: React.Dispatch<React.SetStateAction<IFavorite[]>>;
  toggleFavorite: (movie: IFavorite | undefined) => void;
}
