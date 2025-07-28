import classes from './CheckoutForm.module.css';
import close from '../../assets/close.png';
import { useState } from 'react';
import { toggleClicked,clearCart } from '../../state/ItemSlice/ItemSlice';
import {useSelector, useDispatch } from "react-redux";
import { RootState } from '../../state/store';

const CheckoutForm = () => {
      const totalPrice = useSelector((state: RootState) => state.item.total);
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        const username = localStorage.getItem('userName')
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shippingAddress: '',
        city: '',
        postalCode: ''
    });
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const condition = Object.values(formData).some(value => value === '');
    const name = /\d/.test(formData.name);
    const lastName = /\d/.test(formData.lastName);
    const phoneNumber = /\d/.test(formData.phoneNumber);
    const emailV = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    const onSubmit = () =>{
        if(name || formData.name === '' && !isAuthenticated) {
            alert('Name should be filled');
            return;
        }
        else  if(lastName || formData.lastName === '' && !isAuthenticated) {
            alert('Last Name should be filled');
            return;
        }
        else  if(!phoneNumber || formData.phoneNumber === '' && !isAuthenticated) {
            alert('Phone number should be filled');
            return;
        }
        if(condition && !isAuthenticated ) {
            alert('You must fill all your fields')
            return;
        }
        if(!emailV && !isAuthenticated) {
            alert('You must fill your email');
            return;
        }
        console.log('Your data is', formData);
        setFormData({
            name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shippingAddress: '',
        city: '',
        postalCode: ''
        })
        alert('Order for '  + formData.name || username  + ' was succesufully done')
        dispatch(toggleClicked())
        dispatch(clearCart())
        return;
    }
    const dispatch = useDispatch();
    
    return (
        <div className={classes.form_content}>
            <p className={classes.form_title}>Fill up this form</p>
            <img className={classes.close} onClick={() => dispatch(toggleClicked())} src={close} />
            {!isAuthenticated && (
                <>
                    <label htmlFor="name" />
              <input type="text" name="name" onChange={handleChange} placeholder="Enter your First name" />
              <label htmlFor="Last Name" />
              <input type="text" name="lastName" onChange={handleChange} placeholder="Enter your Last name" />
              <label htmlFor="Email" />
              <input type="text" name="email" onChange={handleChange} required placeholder="Enter your Email Address" />
                </>
            )}
              
              <label htmlFor="Phone Number" />
              <input type="tel" name="phoneNumber" onChange={handleChange} required placeholder="Enter your Phone Number" />
              <label htmlFor="Shipping Address" />
              <input type="text" name="shippingAddress" onChange={handleChange}required placeholder="Shipping Address" />
              <label htmlFor="City" />
              <input type="text" name="city" onChange={handleChange}required placeholder="City" />
              <label htmlFor="Postal Code" />
              <input type="text" name="postalCode" onChange={handleChange} required placeholder="Postal Code" />
              <select>
                <option>Albania</option>
                <option>Kosovo</option>
                <option>Macedonia</option>
                <option>Montenegro</option>
              </select>
              <div className={classes.total_price}>
                  <p>Your total price is ${totalPrice.toFixed(2)}</p>
                </div>
              <div className={classes.btn}>
              <button onClick={onSubmit}>Submit</button>
              </div>
              
        </div>
    );
};
export default CheckoutForm;