import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [approvedOrders, setApprovedOrders] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  const handleApprove = (orderId) => {
    setApprovedOrders((prev) => ({ ...prev, [orderId]: 'approved' }));
    alert("Order approved");
  };

  const handleCancel = (orderId) => {
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        setOrders(prev => prev.filter(order => order._id !== orderId));
        alert("Order canceled");
      })
      .catch(err => console.error("Failed to delete order:", err));
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      // Optionally refetch orders list
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };
  
  

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
  const items = Array.isArray(order.items) ? order.items : [];
  const totalPrice = items.reduce((acc, item) => acc + Number(item.price || 0), 0);

  return (
    <div key={order._id} className="border p-6 rounded shadow-md">
      {/* User Info */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p><strong>Name:</strong> {order.user?.name || "N/A"}</p>
          <p><strong>Location:</strong> {order.user?.location || "N/A"}</p>
          <p><strong>Phone:</strong> {order.user?.number || "N/A"}</p>
          {approvedOrders[order._id] === 'approved' && (
            <p className="text-green-600 font-semibold mt-2">Order approved</p>
          )}
          {approvedOrders[order._id] === 'canceled' && (
            <p className="text-red-600 font-semibold mt-2">Order canceled</p>
          )}
        </div>
        <div className="flex gap-4 text-xl">
          <button 
            onClick={() =>{ handleApprove(order._id); handleUpdateStatus(order._id, 'approved')}} 
            className="text-green-600 hover:text-green-800"
            disabled={approvedOrders[order._id]}
          >
            <FaCheckCircle />
          </button>
          <button 
            onClick={() => {handleCancel(order._id); handleUpdateStatus(order._id, 'canceled')}} 
            className="text-red-600 hover:text-red-800"
            disabled={approvedOrders[order._id]}
          >
            <FaTimesCircle />
          </button>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border rounded p-4 flex gap-4 items-center">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded" 
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">ksh{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right font-bold text-lg">
        Total Price: Ksh{totalPrice}
      </div>
    </div>
   );
   })}
   </div>
  )}
    </div>
  );
};

export default Orders;
