import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: null });

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all");
      console.log("Fetched orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const takeOrder = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/${id}`);

      alert(res.data.message);

      // FIXED — use id instead of _id
      setOrders(prev =>
        prev.map(o => o.id === id ? { ...o, status: "order taken" } : o)
      );

    } catch (err) {
      console.error("Failed to take order:", err.response?.data || err.message);
    }
  };

  const deliverOrder = async (id) => {
    try {
      if (window.confirm('Are you sure product delivered?')) {
      const res = await axios.put(`http://localhost:5000/api/orders/deliver/${id}`);}
      alert(res.data.message);

      // FIXED — use id instead of _id
      setOrders(prev =>
        prev.map(o => o.id === id ? { ...o, status: "delivered" } : o)
      );

    } catch (err) {
      console.error("Failed to take order:", err.response?.data || err.message);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/get');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => { fetchProducts() }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('image', form.image);
    try {
      const res = await axios.post('http://localhost:5000/api/products/upload', data);
      if (res.status === 200) {
        alert('Product uploaded successfully');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload product');
    }
    fetchProducts();
    setProducts(prev => [...prev, res.data]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };



  const handleUpdatePrice = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${id}`, {
        price: form.price,
      });

      fetchProducts();

      setProducts(prev =>
        prev.map(p => (p._id === id ? res.data : p))
      );

    } catch (err) {
      console.error("Update failed", err);
    }
  };


  return (
    <div className="p-6 max-w-6xl mx-auto lg:flex lg:justify-between lg:gap-10">
      <div className='md:w-[65%]'>
        <h1 className="text-2xl font-bold mb-4">Admin Product Manager</h1>
        <div className="space-y-4">
          <input name="name" onChange={handleChange} placeholder="Product Name" className="border p-2 w-full" />
          <input name="description" onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
          <input name="price" onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" />
          <input name="image" type="file" onChange={handleChange} className="border p-2 w-full" />
          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload Product</button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map(p => (
              <div key={p._id} className="border rounded-2xl p-4 mb-4 w-50 flex flex-col justify-between h-full">
                <img src={p.imageUrl} alt={p.name} className="h-32 object-cover mb-2" />
                <p><strong>{p.name}</strong></p>
                <p>{p.description}</p>
                <p className='font-bold'>₹{p.price}</p>
                <input
                  name="price"
                  type="number"
                  placeholder="New Price"
                  className="border p-1 w-full mt-2"
                  onChange={handleChange}
                />

                <div className="flex justify-between items-end mt-2 w-full">
                  {/* FIXED — Update Price button */}
                  <button
                    onClick={() => handleUpdatePrice(p._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Update Price
                  </button>

                  <MdDelete
                    onClick={() => handleDelete(p._id)}
                    className="text-black bg-red-300 border-2 border-black rounded text-2xl cursor-pointer"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-[35%]">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {orders.map(o => (
          <div key={o.id} className="border rounded-2xl p-4 mb-4">
            <p><strong>User:</strong> {o.userName}</p>
            <p><strong>Product:</strong> {o.productName}</p>
            <p><strong>Quantity:</strong> {o.quantity}</p>
            {/* <button className='border ' onClick={() => takeOrder(o.id)}>Take Order</button> */}
            <div className='flex justify-between '>
            {o.status === "order taken" ? (
              <button className="bg-yellow-500 text-white px-3 py-1 rounded mt-2" disabled>
                Order Taken
              </button>
            ) : o.status === "delivered" ? (
              <button className="bg-green-500 text-white px-3 py-1 rounded mt-2" disabled>
                Delivered
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => takeOrder(o.id)}
              >
                Take Order
              </button>
            )}
            <button onClick={()=>deliverOrder(o.id)} className='border border-black px-3 rounded mt-2"'>order delivered</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}