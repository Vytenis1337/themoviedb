import './SingleMenu.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import { MovieCard, MovieProps } from '../MovieCard/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { singleMenuSettings } from '../../utils/movieListSettings';

interface stepType {
  id: string;
}
interface useStepType {
  appId: stepType;
}

export const SingleMenu = ({ appId }: any) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['similar'],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${appId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          return res.data.results;
        }),
  });

  useEffect(() => {
    refetch();
  }, [appId]);

  return (
    <div className='single-menu'>
      <h1 className='single-menu-h1'>Other Posts You may like</h1>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <Slider className='single-related' {...singleMenuSettings}>
          {data.map((movie: MovieProps) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Slider>
      )}
    </div>
  );
};
