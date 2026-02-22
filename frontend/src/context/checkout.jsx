import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    number: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeliveryClick = async () => {
    if (!formData.name || !formData.location || !formData.number) {
      alert("Please fill in all details.");
      return;
    }
  
    const orderData = {
      user: formData,
      items: cartItems.map(item => ({
        name: item.name || item.food_title,
        price: item.price,
        quantity: item.quantity,
        image: item.image || item.image_url
      })),
      status: "Preparing",
      createdAt: new Date().toISOString()
    };
  
    try {
      const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
  
      if (!res.ok) throw new Error('Failed to send order');
  
      const result = await res.json(); // <-- get the created order with ID
  
      // Save order info to sessionStorage
      sessionStorage.setItem('orderInfo', JSON.stringify({
        name: formData.name,
        location: formData.location,
        number: formData.number,
        orderId: result._id // <-- ensure your backend sends this
      }));
  
      console.log("Order sent successfully");
      navigate('/Checkout/orderprogress');
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Order failed to submit. Try again.");
    }
  };
  
  
  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
      <form className='space-y-4'>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className='w-full border p-2 rounded' />
        <input type="text" name="location" placeholder="Delivery Location" onChange={handleChange} className='w-full border p-2 rounded' />
        <input type="tel" name="number" placeholder="Phone Number" onChange={handleChange} className='w-full border p-2 rounded' />
        
        <button type="button" onClick={handleDeliveryClick} className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'>
          Pay on Delivery
        </button>
      </form>
    </div>
  );
};

export default Checkout;

