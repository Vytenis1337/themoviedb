import './Navbar.css';
import { useEffect, useState } from 'react';
import newRequest from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';
import { FaCity } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

export const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['myMovies'],
    queryFn: () =>
      newRequest.get(`/movies?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null!);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-logo'>
        <FaCity size={50} />
      </Link>
      <button
        className='hamburger'
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      ></button>
      <div className={isNavExpanded ? 'navbar-menu expanded' : 'navbar-menu'}>
        <ul>
          <li>
            <Link
              className='navbar-menu-link'
              to='/browse'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Browse
            </Link>
          </li>

          <li>
            {isLoading ? (
              'loading'
            ) : error ? (
              'Something went wrong!'
            ) : data.length ? (
              <Link
                className='navbar-menu-library-link'
                to='/library'
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
              >
                Library
                <div className='navbar-library-count'>
                  <div className='navbar-library-count-number'>
                    {data.length}
                  </div>
                </div>
              </Link>
            ) : null}
          </li>

          <li>
            <Link
              className='navbar-menu-link'
              to='/'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </div>
      <div className='login-block'>
        {currentUser ? (
          <div className='login' onClick={() => setOpen(!open)}>
            <div className='username'>
              {currentUser?.username.substring(0, 1)}
            </div>
            {open && (
              <div className='user-options' onClick={handleLogout}>
                Logout
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to='/login' className='link'>
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
