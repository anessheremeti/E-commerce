import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import React, { useState, useEffect } from "react";
import Order from "../Order/Order";
import { toggleClicked } from '../../state/ItemSlice/ItemSlice';
import Item from "../Item/Item";
import Signup from '../SignUp/SignUp';
import { supabase } from "../../createClient.js";

const Navbar: React.FC = () => {
  const quantity = useSelector((state: RootState) => state.item.quantity);
  const [signUp, setSignUp] = useState(false);
  const isClicked = useSelector((state: RootState) => state.item.isClicked);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userName = localStorage.getItem('userName');
  
  const onChangeHandler = () => {
    setSignUp(!signUp);
  };

  const handleLogout = async () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
    const { error } = await supabase.auth.signOut()
    localStorage.clear();
    location.reload();
    

  };

  useEffect(() => {
    document.body.style.overflow = signUp ? 'hidden' : 'auto';
  }, [signUp]);

  return (
    <div className={classes.container}>
      <div className={`${classes.content} ${quantity > 0 && isClicked ? classes.blur : classes.nonblur}`}>
        <h4>Jersey Shop</h4>

        {!signUp && <div className={classes.search}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>}

        {!signUp && (
          <div className={classes.icons}>
            {isAuthenticated  && userName ? (
              <div className={classes.userInfo}>
                <span>Hello, {userName}</span>
                <button onClick={handleLogout}>Log out</button>
              </div>
            ) : (
              <button onClick={onChangeHandler}>Sign up</button>
            )}
            <div><svg
              onClick={() => dispatch(toggleClicked())}
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              style={{minWidth:'4rem'}}
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
<div className={classes.total}>
              <p>{quantity}</p> </div>
            
            </div>
            
          </div>
        )}
      </div>

      {isClicked && <Order />}

      {signUp && <div className={!signUp ? classes.blur : classes.nonblur}><Signup /></div>}

      {!signUp && <Item search={search} />}
    </div>
  );
};

export default Navbar;
