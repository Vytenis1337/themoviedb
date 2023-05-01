import './MovieCard.css';
import { Link } from 'react-router-dom';

export type MovieProps = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
};

export const MovieCard = ({
  id,
  title,
  poster_path,
  overview,
  vote_average,
  vote_count,
  release_date,
}: MovieProps) => {
  const base_url = 'https://image.tmdb.org/t/p/original/';

  return (
    <div className='movie-card'>
      <div className='movie-body'>
        <Link
          to={`/movies/single/${id}`}
          state={{
            id,
            title,
            poster_path,
            overview,
            vote_average,
            vote_count,
            release_date,
          }}
        >
          <img
            className='movie-img'
            src={
              poster_path
                ? `${base_url}${poster_path}`
                : 'https://2.bp.blogspot.com/-1no2ep6vJ8U/WqVHSQtSsDI/AAAAAAAAAXI/xkIj0KGNDbkESV39miJuPPuBin3HlX4GgCLcBGAs/s1600/brokenImage.png'
            }
            alt={title}
          />
        </Link>
      </div>
    </div>
  );
};
