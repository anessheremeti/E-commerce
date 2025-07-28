import { useState } from "react";
import classes from "./Signup.module.css";
import { supabase } from "../../createClient.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value.trim()
    }));
  };

  const isFormValid = () => {
    return (
      user.user.trim().length > 0 &&
      user.email.trim().length > 0 &&
      user.password.trim().length >= 6
    );
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isFormValid()) {
      setErrorMessage("Të gjitha fushat janë të detyrueshme dhe password duhet të ketë së paku 6 karaktere.");
      return;
    }

    setIsSubmitting(true);
    document.body.style.cursor = 'wait'; 

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', user.email)
        .single();

      if (existingUser) {
        setErrorMessage("Ky email është përdorur tashmë.");
        return;
      }

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Gabim Supabase:', checkError.message);
        setErrorMessage("Gabim gjatë kontrollimit të emailit.");
        return;
      }

    const { error: insertError } = await supabase
  .from('users')
  .insert({
    user: user.user,
    email: user.email,
    password: user.password,
  });

if (insertError) {
  if (insertError.code === '23505') { 
    setErrorMessage("Ky email është përdorur tashmë.");
  } else {
    console.error('Gabim Supabase:', insertError.message);
    setErrorMessage("Gabim gjatë regjistrimit.");
  }
  return;
}


      localStorage.setItem('userName', user.user);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } catch (err) {
      console.error("Gabim i papritur:", err);
      setErrorMessage("Diçka shkoi keq.");
    } finally {
      setIsSubmitting(false);
      document.body.style.cursor = 'default'; 
    }
  };

  return (
    <main className={classes.signupContainer} role="main">
      <h1 className={classes.formTitle}>Create Account</h1>
      <form className={classes.signupForm} noValidate onSubmit={onSubmitHandler}>
        <div className={classes.formGroup}>
          <label htmlFor="user">Full Name <span aria-hidden="true">*</span></label>
          <input
            onChange={onChangeHandler}
            type="text"
            id="user"
            name="user"
            placeholder="Your full name"
            required
            value={user.user}
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
          <input
            onChange={onChangeHandler}
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            value={user.email}
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="password">Password <span aria-hidden="true">*</span></label>
          <input
            onChange={onChangeHandler}
            type="password"
            id="password"
            name="password"
            placeholder="Create password"
            minLength={6}
            required
            value={user.password}
          />
        </div>

        {errorMessage && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>
        )}

        <button
          type="submit"
          className={classes.buttonWhite}
          disabled={isSubmitting}
          style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'Creating...' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className={classes.buttonWhite}
          disabled={isSubmitting}
        >
          Log In
        </button>
      </form>
    </main>
  );
};

export default SignUp;
