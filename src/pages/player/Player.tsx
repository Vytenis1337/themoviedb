import './Player.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Loading } from '../../components/Loading/Loading';

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

  const navigate = useNavigate();
  return (
    <div className='player'>
      {isLoading ? (
        <Loading />
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className='player-content'>
          <div className='player-top'>
            <button className='player-back-button' onClick={() => navigate(-1)}>
              <BiArrowBack size={30} />
            </button>
            <h1 className='player-h1'>{state}</h1>
          </div>
          <div className='video-player'>
            <ReactPlayer
              controls={true}
              width='100%'
              height={400}
              url={`https://www.youtube.com/watch?v=${data[1].key}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
