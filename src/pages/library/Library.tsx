import './Library.css';
import { useQuery } from '@tanstack/react-query';
import {
  LibraryCard,
  LibraryProps,
} from '../../components/LibraryCard/LibraryCard';
import newRequest from '../../utils/newRequest';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';

export const Library = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myMovies'],
    queryFn: () =>
      newRequest.get(`/movies?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className='library'>
      <div className='library-top-section'>
        <button onClick={() => navigate(-1)} className='library-back-button'>
          <BiArrowBack size={30} />
        </button>
        <h1 className='library-main-title'>My Library</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className='library-content'>
          {data.map((item: LibraryProps) => (
            <LibraryCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
