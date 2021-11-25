export const makeImgPath = (img: string | null, width: string = "w500") =>
  img ? `https://image.tmdb.org/t/p/${width}${img}` : NO_PHOTO_URI;

const NO_PHOTO_URI =
  "https://www.mukwonagolibrary.org/wp-content/uploads/2018/07/no-movie.jpg";
