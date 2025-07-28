import React, { useState } from 'react';
import classes from './Login.module.css';
import { supabase } from "../../createClient.js";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  let foundUser;
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email.trim());

    if (error) {
      console.error('Error fetching users:', error);
      setLoginStatus("An unexpected error occurred. Please try again.");
      return;
    }

    if (!data || data.length === 0) {
      setLoginStatus("No user found with this email.");
      return;
    }

     foundUser = data[0];

    if (foundUser.password.trim() === user.password.trim()) {
      console.log('Login successful!');
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
  );
};

export default Login;
