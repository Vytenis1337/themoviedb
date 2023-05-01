import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './LibraryCard.css';
import { Link } from 'react-router-dom';

export type LibraryProps = {
  id: number;
  _id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
};

export const LibraryCard = ({
  id,
  title,
  poster_path,
  overview,
  vote_average,
  vote_count,
  release_date,
  _id,
}: LibraryProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/movies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myMovies']);
    },
  });

  const handleDelete = (id: any) => {
    mutation.mutate(id);
  };
  const base_url = 'https://image.tmdb.org/t/p/original/';
  return (
    <div className='library-card'>
      <Link
        to={`/movies/single/${id}`}
        state={{
          poster_path,
          id,
          title,
          overview,
          vote_average,
          vote_count,
          release_date,
        }}
      >
        <img
          className='library-img'
          src={`${base_url}${poster_path}`}
          alt={title}
        />
      </Link>
      <div className='library-body'>
        <div className='library-title'>{title}</div>

        <div className='library-buttons'>
          <Link
            to={`/movies/single/${id}`}
            state={{
              poster_path,
              id,
              title,
              overview,
              vote_average,
              vote_count,
              release_date,
            }}
          >
            <button className='library-button-details'>Details</button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className='library-button-remove'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
