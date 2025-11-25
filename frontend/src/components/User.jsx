import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userdata = JSON.parse(storedUser);
      console.log("Stored user:", userdata);
      setUser(userdata);
    }
  }, []);

  // Fetch orders for a user
  const fetchOrderDetails = async (userId) => {
    try {
      const res = await axios.get(
        `https://srihampharma.onrender.com/api/orders/user/${userId}`
      );
      setOrders(res.data);
      console.log("User orders:", res.data);
    } catch (err) {
      alert("Failed to fetch order details");
      console.error(err);
    }
  };

  // Delete an order
  const handleDeleteOrd = async (orderId) => {
    try {
      if (window.confirm('Are you sure you want to delete this order?')) {
        await axios.delete(`https://srihampharma.onrender.com/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`, // only if backend checks token
          },
        });

        // Adjust depending on user object shape
        fetchOrderDetails(user.id || user.user.id);
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrderDetails(user.id || user.user.id);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="text-black text-3xl font-bold border-b-2 flex justify-between items-center px-6 py-4 bg-white shadow">
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-300 border-2 px-4 py-2 rounded-2xl text-2xl hover:bg-red-300 transition"
        >
          Home
        </button>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <h1 className="bg-blue-400 border-2 px-4 py-2 rounded-2xl text-2xl">
                {user.username || user.user?.username || user.user?.name}
              </h1>
              <p className="bg-blue-400 border-2 px-4 py-2 rounded-2xl text-2xl">
                {user.email || user.user?.email}
              </p>
            </>
          ) : (
            <h1 className="text-xl text-gray-600">No user</h1>
          )}
        </div>
      </div>

      {/* Orders Section */}
      <div className="flex flex-col items-center mt-8">
        <h2 className="bg-blue-400 border-2 px-6 py-2 rounded-2xl text-2xl mb-4">
          Orders
        </h2>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl p-4 my-2 w-3/4 bg-white shadow"
            >
              <p className="text-lg">
                <span className="font-semibold">Product:</span>{" "}
                {order.productId.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Price:</span>{" "}
                {order.productId.price}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>
              <div className="flex justify-between items-center w-full">
                <div className="mt-3">
                  {order.status === "pending" ? (
                    <button className="bg-red-500 text-white px-4 py-2 border-2 rounded-2xl">
                      Pending
                    </button>
                  ) : order.status === "order taken" ? (
                    <button className="bg-yellow-400 text-white px-4 py-2 border-2 rounded-2xl">
                      Order Taken
                    </button>
                  ) : order.status === "delivered" ? (
                    <button className="bg-green-500 text-white px-4 py-2 border-2 rounded-2xl">
                      Delivered
                    </button>
                  ) : null}

                </div>
                <MdDelete
                  onClick={() =>
                    (order.status !== "order taken" && order.status !== "delivered") &&
                    handleDeleteOrd(order._id)
                  }
                  className={`
    text-black border-2 border-black rounded text-2xl cursor-pointer
    ${order.status === "order taken" || order.status === "delivered"
                      ? "bg-gray-300 cursor-not-allowed opacity-50"
                      : "bg-red-300"
                    }
  `}
                  disabled={order.status === "order taken" || order.status === "delivered"}
                />

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No orders found</p>
        )}
      </div>
    </div>
  );
}