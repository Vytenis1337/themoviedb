import './Player.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { useNavigate } from 'react-router-dom';

export const Player = () => {
  const { pathname } = useLocation();
  const state = useLocation().state;

  const videoId = pathname.split('/')[2];
  const { isLoading, error, data } = useQuery({
    queryKey: ['video'],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=ab4acdde934f536f88f60bc1bf46f441&language=en-US`
        )
        .then((res) => {
          return res.data.results;
        }),
  });
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className='video'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className='video-content'>
          <div className='video-top'>
            <button className='content-button' onClick={() => navigate(-1)}>
              go back
            </button>
            <h1 className='single-h1'>{state}</h1>
            <button className='content-button'>Edit</button>
          </div>
          <div className='video-player'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${data[1].key}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
