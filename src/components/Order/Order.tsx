import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import classes from "./Order.module.css";
import close from "../../assets/close.png";
import { toggleClicked } from "../../state/ItemSlice/ItemSlice";
import { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const Order: React.FC = () => {
  interface Item {
    name: string;
    quantity: number;
  }

  const item = useSelector((state: RootState) => state.item.items);
  const quantity = useSelector((state: RootState) => state.item.quantity);
  const isClicked = useSelector((state: RootState) => state.item.isClicked);
  const totalPrice = useSelector((state: RootState) => state.item.total);

  const [isCheckedOut, setIsCheckoutOut] = useState(false);

  const onCheckoutHandler = () => {
    setIsCheckoutOut(!isCheckedOut);
  };
  const dispatch = useDispatch();
  return (
    <div>
      {isClicked && (
        <>
          <div className={classes.overlay}></div>
          <div className={classes.container}>
            {isCheckedOut && <CheckoutForm />}
            {!isCheckedOut && (
              <div className={classes.order_content}>
                <img
                  onClick={() => dispatch(toggleClicked())}
                  className={classes.close_btn}
                  src={close}
                />
                <div className={classes.order_item}>
                  {item.map((item: Item, id: number) => {
                    if (item.quantity > 0) {
                      return (
                        <ul key={id}>
                          <li>
                            {item.name} Orders: {item.quantity}
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
                <div className={classes.total_price}>
                  {quantity > 0 && (
                    <p>Your total price is ${totalPrice.toFixed(2)}</p>
                  )}
                </div>
                {quantity > 0 && (
                  <button
                    onClick={onCheckoutHandler}
                    className={classes.checkout_btn}
                  >
                    Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Order;
