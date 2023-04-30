import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
import newRequest from '../../utils/newRequest';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await newRequest.post('/auth/login', { username, password });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/');
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='login-h1'>Sign in</h1>
        <label className='login-label' htmlFor=''>
          Username
        </label>
        <input
          className='login-input'
          name='username'
          type='text'
          placeholder='johndoe'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className='login-label' htmlFor=''>
          Password
        </label>
        <input
          className='login-input'
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' type='submit'>
          Login
        </button>
        {error && error}
        <span>
          Don't have an account yet? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  );
};
