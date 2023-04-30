import './Library.css';
import { useQuery } from '@tanstack/react-query';
import {
  LibraryCard,
  LibraryProps,
} from '../../components/LibraryCard/LibraryCard';
import newRequest from '../../utils/newRequest';

export const Library = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  const { isLoading, error, data } = useQuery({
    queryKey: ['myMovies'],
    queryFn: () =>
      newRequest.get(`/movies?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className='library'>
      {isLoading ? (
        'loading'
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
