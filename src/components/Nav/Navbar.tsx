import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import React, { useState } from "react";
import Order from "../Order/Order";
import { toggleClicked } from '../../state/ItemSlice/ItemSlice';
import Item from "../Item/Item";

const Navbar: React.FC = () => {
  const quantity = useSelector((state: RootState) => state.item.quantity);
  const isClicked = useSelector((state: RootState) => state.item.isClicked);
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState(""); 

  return (
    <div className={classes.container}>
      <div className={`${classes.content} ${quantity > 0 && isClicked ? classes.blur : classes.nonblur}`}>
        <h4>Jersey Shop</h4>
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={classes.icons} onClick={() => dispatch(toggleClicked())}>
          
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            
          >
            
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
       
          <div className={classes.total}>
            <p>{quantity}</p>
          </div>
        </div>
      </div>
      {isClicked && <Order />}
     
      <Item search={search} />
    </div>
  );
};

export default Navbar;
