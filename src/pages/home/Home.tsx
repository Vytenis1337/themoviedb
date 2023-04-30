import './Home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='home'>
      <div className='home-content'>
        <Link to={'/login'}>
          <button className='home-button'>Login</button>
        </Link>
        <Link to={'/browse'}>
          <button className='home-button'>Browse</button>
        </Link>
      </div>
    </div>
  );
};
