import './Details.css';
import { Link, useLocation } from 'react-router-dom';
import { SingleMenu } from '../../components/SingleMenu/SingleMenu';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';

export const Details = () => {
  const state = useLocation().state;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  const { pathname } = useLocation();

  const appId = pathname.split('/')[3];

  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['movie'],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${appId}?api_key=ab4acdde934f536f88f60bc1bf46f441&language=en-US`
        )
        .then((res) => {
          return res.data;
        }),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (state) => {
      return newRequest.post(`/movies/library`, state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myMovies']);
    },
  });

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentUser) {
      try {
        mutation.mutate(state);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    refetch();
  }, [appId]);

  const base_url = 'https://image.tmdb.org/t/p/original/';

  return (
    <div className='single'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div>
          <div className='single-content'>
            <div className='single-top'>
              <button className='content-button' onClick={() => navigate(-1)}>
                <BiArrowBack size={40} />
              </button>
              <div className='single-title'>
                <h1 className='single-h1'>{data.title}</h1>
                <div className='single-release'>
                  Release Date:{data.release_date}
                </div>
              </div>
              <button className='content-button'>Edit</button>
            </div>
            <img
              className='single-img'
              src={`${base_url}${data.poster_path}`}
              alt={data.title}
            />
            <div className='single-rating'>
              <div className='single-movie-rating'>
                <span className='single-movie-rating-span'>Movie Rating:</span>
                {data.vote_average}
              </div>
              <div className='single-movie-rating'>
                <span className='single-movie-rating-span'>Total Votes:</span>
                {data.vote_count}
              </div>
            </div>
            <div className='single-description'>
              <p className='single-p'>{data.overview}</p>{' '}
            </div>
            <div className='single-watch-library'>
              <Link to={`/player/${appId}`} state={data.title}>
                <button className='single-button'>Watch Trailer</button>
              </Link>
              <button
                // disabled={checkId.some((lib) => lib.id === state.id)}
                className='single-button'
                onClick={handleClick}
              >
                Add to Library
              </button>{' '}
            </div>
          </div>
          <div className='single-menu'>
            <SingleMenu appId={appId} />
          </div>
        </div>
      )}
    </div>
  );
};
