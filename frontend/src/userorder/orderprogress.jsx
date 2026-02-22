import React, { useEffect, useState } from 'react';

const STATUS_STEPS = ['Preparing', 'Out for Delivery', 'Delivered'];

const OrderProgress = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Preparing');

  useEffect(() => {
    const storedInfo = sessionStorage.getItem('orderInfo');
    if (storedInfo) {
      const parsed = JSON.parse(storedInfo);
      setOrderInfo(parsed);

      // Poll order status every 5s
      const interval = setInterval(() => {
        fetch(`http://localhost:5000/orders/${parsed._id}`)
          .then(res => res.json())
          .then(data => setOrderStatus(data.status))
          .catch(err => console.error("Failed to fetch order status:", err));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  if (!orderInfo) {
    return <div className="text-center p-4">No order found. Please return to checkout.</div>;
  }

  if (orderStatus === 'Cancelled') {
    return <div className="text-center p-4 text-red-600 font-bold">Your order has been cancelled.</div>;
  }

  if (orderStatus === 'approvedd') {
    return <div className="text-center p-4 text-green-600 font-bold">Your order will be delivered!</div>;
  }

  const currentStep = STATUS_STEPS.indexOf(orderStatus);

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Order Progress</h2>
      <p className='mb-2'>Hi, <strong>{orderInfo.name}</strong>! Your order is currently:</p>
      <p className='text-lg font-semibold mb-6'>{orderStatus}</p>

      {/* Progress Bar */}
      <div className='flex justify-between items-center mb-6'>
        {STATUS_STEPS.map((step, index) => (
          <div key={step} className='flex-1 text-center'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-green-600' : 'bg-gray-300'}`}
              style={{ width: '100%', marginBottom: '4px' }}
            ></div>
            <span className={`text-sm ${index === currentStep ? 'font-bold text-green-700' : 'text-gray-500'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      <p><strong>Delivery Location:</strong> {orderInfo.location}</p>
      <p><strong>Phone:</strong> {orderInfo.number}</p>
    </div>
  );
};

export default OrderProgress;


