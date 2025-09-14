import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './routes/product.js'; // 👈 Add this line

import authRoutes from './routes/auth.js';
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app=express();


app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use('/api/products', productRoutes); // 👈 Mount the new route

app.use('/api/auth',authRoutes);

const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
console.log('connected to MongoDB');
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
}).catch((err)=>console.log(err));