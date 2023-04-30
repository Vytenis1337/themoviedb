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

  const handleChange = (e: { target: { name: any; value: any } }) => {
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
      <h1>Register</h1>
      <form>
        <input
          required
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
        <input
          required
          type='email'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
        <input
          required
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};
