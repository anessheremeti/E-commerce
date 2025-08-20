import React, { useState } from 'react';
import classes from './Login.module.css';
import { supabase } from "../../createClient.js";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id:'',
    email: '',
    password: ''
  });
  let foundUser;
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const goBackHandler = () => {
    console.log('heyyy')
    navigate('/')
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data:insertedUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email.trim());

    if (error) {
      console.error('Error fetching users:', error);
      setLoginStatus("An unexpected error occurred. Please try again.");
      return;
    }

    if (!insertedUser || insertedUser.length === 0) {
      setLoginStatus("No user found with this email.");
      return;
    }

     foundUser = insertedUser[0];

    if (foundUser.password.trim() === user.password.trim()) {
      console.log('Login successful!');
      localStorage.setItem('userId', foundUser.id);
      localStorage.setItem('userName', foundUser.user); 
      localStorage.setItem('isAuthenticated','true')
      navigate('/');
    } else {
      setLoginStatus("Incorrect password.");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div onClick={goBackHandler}  className={classes.arrow}>
<svg
  style={{ width: '4.2rem' }}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className={classes.size05} 
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
  />
</svg>

      </div>
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <div className={classes.field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className={classes.field}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className={classes.actions}>
          <button type="submit">Log In</button>
          <a href="/forgot-password">Forgot password?</a>
        </div>

        {loginStatus && <p className={classes.status}>{loginStatus}</p>}
      </form>
    </div>
    </div>
  );
};

export default Login;
