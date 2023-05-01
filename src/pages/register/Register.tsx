import { Link } from 'react-router-dom';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await newRequest.post('/auth/register', inputs);
      navigate('/login');
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className='auth'>
      <form className='auth-form'>
        <h1 className='auth-h1'>Register</h1>
        <label className='auth-label' htmlFor=''>
          Username
        </label>
        <input
          className='auth-input'
          required
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
        <label className='auth-label' htmlFor=''>
          Email
        </label>
        <input
          className='auth-input'
          required
          type='email'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
        <label className='auth-label' htmlFor=''>
          Password
        </label>
        <input
          className='auth-input'
          required
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
        <button className='auth-button' onClick={handleSubmit}>
          Register
        </button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};
