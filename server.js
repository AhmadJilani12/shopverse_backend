const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
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


// =======================================
// ✅ HARDCODE CREATE ROUTE
// =======================================
app.get('/create', async (req, res) => {
    try {
        const product = new Product({
            name: "Hardcoded Laptop",
            price: 75000
        });

        const savedProduct = await product.save();

        res.json({
            message: "Product Created Successfully ✅",
            data: savedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// =======================================
// ✅ READ ALL PRODUCTS
// =======================================
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // ✅ Capital P
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});