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



  const handleUpdate = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/products/${id}`, {
      name: form.name,
      description: form.description,
      price: form.price,
    });
    fetchProducts();
    setProducts(prev => prev.map(p => p._id === id ? res.data : p));

  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Product Manager</h1>
      <div className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Product Name" className="border p-2 w-full" />
        <input name="description" onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input name="price" onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" />
        <input name="image" type="file" onChange={handleChange} className="border p-2 w-full" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload Product</button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {products.map(p => (
            <div key={p._id} className="border rounded-2xl p-4 mb-4 w-50">
              <img src={p.imageUrl} alt={p.name} className="h-32 object-cover mb-2" />
              <p><strong>{p.name}</strong></p>
              <p>{p.description}</p>
              <p>₹{p.price}</p>
              <div className='flex justify-between items-center '>
                <button onClick={() => handleUpdate(p._id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Update</button>
                <MdDelete onClick={() => handleDelete(p._id)} className='text-black mt-2 bg-red-300 border-2 border-black rounded text-2xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        {orders.map(o => (
          <div key={o._id} className="border rounded-2xl p-4 mb-4">
            <p><strong>User:</strong> {o.userName}</p>
            <p><strong>Product:</strong> {o.productName}</p>
            <p><strong>Quantity:</strong> {o.quantity}</p>
            <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}