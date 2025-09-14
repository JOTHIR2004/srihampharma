import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function User() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userdata = JSON.parse(storedUser);
      console.log("Stored user:", userdata);
      setUser(userdata);
    }
  }, []);

  const fetchOrderDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
      setOrders(res.data);
      console.log("User orders:", res.data);
    } catch (err) {
      alert('Failed to fetch order details');
      console.error(err);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      // check if ANY order is pending
      const hasPending = orders.some(o => o.status === 'pending');
      setPending(hasPending);
    }
  }, [orders]);


  useEffect(() => {
    if (user) {
      fetchOrderDetails(localStorage.getItem("id") || user.user.id);
    }
  }, [user]);

  return (
    <>
      <div className='text-black text-3xl font-bold border-2 flex justify-between items-center'>
        <div onClick={() => navigate('/')} className='mx-4 my-2 bg-yellow-300 border-2 p-2 rounded-2xl flex justify-center items-center text-2xl hover:bg-red-300'>
          Home
        </div>
        <div className='flex justify-between items-center gap-4'>
          {user ? (
            <>
              <div>
                <h1 className='mx-4 my-2 bg-blue-400 border-2 p-2 rounded-2xl flex justify-center items-center text-2xl'>{user.user.username || user.user.name}</h1>
              </div>
              <div>
                <p className='mx-4 my-2 bg-blue-400 border-2 p-2 rounded-2xl flex justify-center items-center text-2xl '>{user.user.email}</p>
              </div>
            </>
          ) : (
            <h1>No user</h1>
          )}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h2 className="mx-4 my-2 bg-blue-400 border-2 p-2 rounded-2xl flex justify-center items-center text-2xl ">Orders</h2>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="border rounded-2xl p-2 my-2 w-1/2">
              <p>Product: {order.productId.name}</p>
              <p>Price: {order.productId.price}</p>
              <p>Quantity: {order.quantity}</p>
              <div>
                {pending ? <button className='bg-red-500 p-3 border-2 rounded-2xl'>pending</button> : <button className='bg-green-500 p-3 border-2 rounded-2xl'>delivered</button>}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </>
  );
}
