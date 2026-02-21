const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const Product = require('./models/product');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database Connect
connectDB();

// ✅ Test Route
app.get('/', (req, res) => {
    res.json({ message: "🚀 Server is running & Database connected" });
});


//health api 
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// =======================================
// ✅ HARDCODE CREATE ROUTE
// =======================================
// app.get('/create', async (req, res) => {
//     try {
//         const product = new Product({
//             name: "Hardcoded Laptop",
//             price: 75000
//         });

//         const savedProduct = await product.save();

//         res.json({
//             message: "Product Created Successfully ✅",
//             data: savedProduct
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// =======================================
// ✅ READ ALL PRODUCTS
// =======================================
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find(); // ✅ Capital P
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/create', async (req, res) => {
    const product = new Product({
        name: "Serverless Laptop",
        description: "Test product for serverless Vercel",
        price: 75000,
        category: new mongoose.Types.ObjectId(), // dummy id
        stock: 10
    });
    const saved = await product.save();
    res.json(saved);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});