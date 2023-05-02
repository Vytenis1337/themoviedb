import './Browse.css';
import { useQuery } from '@tanstack/react-query';
import { MovieCard, MovieProps } from '../../components/MovieCard/MovieCard';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { browseSettings } from '../../utils/movieListSettings';

export const Browse = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['rated'],
    queryFn: () =>
      axios
        .get(
          `
          https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          return res.data.results;
        }),
  });

  const {
    isLoading: isLoadingPopular,
    error: errorPopular,
    data: dataPopular,
  } = useQuery({
    queryKey: ['popular'],
    queryFn: () =>
      axios
        .get(
          `
          https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          return res.data.results;
        }),
  });
  const {
    isLoading: isLoadingUpcoming,
    error: errorUpcoming,
    data: dataUpcoming,
  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: () =>
      axios
        .get(
          `
          https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          return res.data.results;
        }),
  });

  return (
    <div className='browse'>
      <h1 className='browse-h1'>Top Rated Movies</h1>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <Slider className='post' {...browseSettings}>
          {data.map((movie: MovieProps) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Slider>
      )}
      <h1 className='browse-h1'>Most Popular Movies</h1>
      {isLoadingPopular ? (
        'loading'
      ) : errorPopular ? (
        'Something went wrong!'
      ) : (
        <Slider className='post' {...browseSettings}>
          {dataPopular.map((movie: MovieProps) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Slider>
      )}
      <h1 className='browse-h1'>Upcoming Movies</h1>
      {isLoadingUpcoming ? (
        'loading'
      ) : errorUpcoming ? (
        'Something went wrong!'
      ) : (
        <Slider className='post' {...browseSettings}>
          {dataUpcoming.map((movie: MovieProps) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Slider>
      )}
    </div>
  );
};
