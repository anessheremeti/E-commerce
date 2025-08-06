// components/CheckoutForm.tsx
import classes from './CheckoutForm.module.css';
import close from '../../assets/close.png';
import { useState } from 'react';
import { toggleClicked, clearCart } from '../../state/ItemSlice/ItemSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../state/store';
import insertOrders from "../hooks/insertOrders";
import { useNavigate } from 'react-router-dom';
import useCountries from '../hooks/useCountries';

const CheckoutForm = () => {
  const totalPrice = useSelector((state: RootState) => state.item.total);
  const items = useSelector((state: RootState) => state.item.items);
  const filteredItems = items.map((item) => item.ProductId);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('userName');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { countries, loading } = useCountries();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const hasEmpty = Object.values(formData).some(v => v === '');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const nameHasDigit = /\d/.test(formData.name);
    const lastNameHasDigit = /\d/.test(formData.lastName);
    const phoneValid = /\d/.test(formData.phoneNumber);

    if (!isAuthenticated && hasEmpty) return "You must fill all your fields";
    if (!isAuthenticated && nameHasDigit) return "Name should not contain digits";
    if (!isAuthenticated && lastNameHasDigit) return "Last Name should not contain digits";
    if (!isAuthenticated && !emailValid) return "Invalid email";
    if (!isAuthenticated && !phoneValid) return "Invalid phone number";

    return null;
  };

  const onSubmit = async () => {
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    if (!isAuthenticated) {
      navigate('/signUp');
      return;
    }

    alert(`Order for ${formData.name || username} was successfully done`);

    try {
      await insertOrders(filteredItems, userId);
      dispatch(clearCart());
      dispatch(toggleClicked());
    } catch (err) {
      console.error("Error submitting order:", err);
    }

    setFormData({
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      shippingAddress: '',
      city: '',
      postalCode: '',
      country: ''
    });
  };

  return (
    <div className={classes.form_content}>
      <p className={classes.form_title}>Fill up this form</p>
      <img className={classes.close} onClick={() => dispatch(toggleClicked())} src={close} alt="close" />

      {!isAuthenticated && (
        <>
          <label htmlFor="name" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your First name"
          />
          <label htmlFor="Last Name" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your Last name"
          />
          <label htmlFor="Email" />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your Email Address"
          />
        </>
      )}

      <label htmlFor="Phone Number" />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        placeholder="Enter your Phone Number"
      />
      <label htmlFor="Shipping Address" />
      <input
        type="text"
        name="shippingAddress"
        value={formData.shippingAddress}
        onChange={handleChange}
        required
        placeholder="Shipping Address"
      />
      <label htmlFor="City" />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        placeholder="City"
      />
      <label htmlFor="Postal Code" />
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
        placeholder="Postal Code"
      />
      <select style={{maxWidth:'20%'}} name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          countries?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))
        )}
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
