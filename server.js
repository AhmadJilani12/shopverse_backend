const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

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


// =============================
// ✅ CREATE (Write) Operation
// =============================
app.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;

        const product = new Product({
            name,
            price
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// =============================
// ✅ READ Operation
// =============================
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});