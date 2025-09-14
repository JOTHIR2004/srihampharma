import { useState, useEffect, useContext } from 'react';
import { LuPanelBottomClose } from "react-icons/lu";
import { AuthContext } from "../services/AuthContext";
import axios from "axios";

export default function Cards({ id, name, img, desc, price }) {
    const { user,userid } = useContext(AuthContext);
    const [showDetails, setShowDetails] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleOrder = async () => {
        try {
            const payload = {
                userId:localStorage.getItem("id"),  // support both cases
                productId: id,
                quantity
            };

            console.log("📦 Sending order payload:", payload);

            const res = await axios.post("http://localhost:5000/api/orders/create", payload);
            console.log("✅ Order response:", res.data);

            alert("Order placed successfully!");
        } catch (err) {
            console.error("❌ Order error:", err.response?.data || err.message);

            // extra debugging
            console.log("🔎 Debug info → user:", user, " | productId:", id, " | quantity:", quantity);

            alert("Failed to place order");
        }
    };

    return (
        <>
            <div key={id} className="w-full flex-y justify-evenly items-center shadow-2xl shadow-blue-100 md:w-full sm:w-full p-2 max-h-80 border-1 rounded-2xl bg-white   hover:shadow-2xl hover:shadow-blue-500 hover:ease-out-in duration-300" onClick={() => {
                setQuantity(1); setShowDetails(true);
            }}>
                <img src={img} alt='image' className='w-full max-h-65 object-contain rounded-xl' />
                <h1 className='mt-2 flex justify-center items-end font-bldbitcnt text-xs sm:text-xl md:text-2xl text-blue-500'>{name}</h1>
            </div>

            <div className={`fixed z-50 left-0 bottom-0 transition-transform duration-900 ease-in-out bg-white w-full ${showDetails ? "translate-y-0" : "translate-y-full"} `} style={{ height: "90vh" }}>
                <div className='relative bg-blue-200 h-full p-6 overflow-y-auto'>
                    <button className='absolute right-4 text-3xl top-4 text-blue-500 hover:text-yellow-400' onClick={() => { setShowDetails(false) }} ><LuPanelBottomClose /></button>

                    {/* <p className='text-2xl font-bold mb-4'>This is Product {p.id} </p> */}
                    <div className='md:flex lg:flex xl-flex'>
                        <div className='flex justify-center items-center mx-10 w-50 h-50 p-5 sm:w-90 sm:h-110 md:w-auto md:h-auto rounded-2xl bg-white'>
                            <img src={img} alt='paracetomol image' className='w-75 h-75 object-contain rounded-xl' />
                        </div>
                        <div>
                            <div>
                                <h1 className='p-2 text-3xl sm:text-4xl md:text-6xl my-4 font-bldbitcnt text-blue-600 top-0'>{name}</h1>
                                <div className="p-2 text-xl">
                                    <h1 className="font-bldbitcnt text-2xl">Component:</h1>
                                    <p>{desc}</p>
                                </div>

                                <div className="p-2 text-xl">
                                    <h1 className="font-bldbitcnt text-2xl">Price:</h1>
                                    <p>{price}</p>
                                </div>

                            </div>
                            <div className='flex gap-5 items-center my-4'>
                                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className='bg-blue-500 flex justify-center items-start text-white rounded border-2 border-black text-2xl w-6 h-10'>
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    placeholder="Enter number of products"
                                    className="border p-2 rounded-lg"
                                />
                                <button onClick={() => setQuantity(quantity + 1)} className='bg-blue-500 flex justify-center items-start text-white rounded border-2 border-black text-2xl w-6 h-10'>
                                    +
                                </button>
                            </div>
                            <p className="font-bldbitcnt text-2xl mt-2">
                                Number of products: <span className="font-bold">{quantity}</span>
                            </p>
                            <div>
                                <button onClick={handleOrder} className='bg-yellow-300 rounded-2xl border-2 border-black p-2 text-2xl my-4 '>ORDER</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}