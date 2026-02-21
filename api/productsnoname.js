// pages/api/products.js  (Vercel style serverless function)
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImages } = require('../../controllers/productController');
const { verifyToken, isAdmin } = require('../../middleware/auth');
const connectDB = require('../../config/db');
const Product = require('../../models/Product'); // required inside handler
const mongoose = require('mongoose');

// Make Mongoose serverless safe
const serverlessHandler = async (req, res) => {
    // Connect DB
    await connectDB();

    const method = req.method;

    try {
        if (method === 'GET') {
            // If query id present, get single product
            const { id } = req.query;
            if (id) {
                await getProduct(req, res);
            } else {
                await getProducts(req, res);
            }
        } 
        else if (method === 'POST') {
            await verifyToken(req, res);
            await isAdmin(req, res);
            await uploadImages(req, res);
            await createProduct(req, res);
        } 
        else if (method === 'PUT') {
            await verifyToken(req, res);
            await isAdmin(req, res);
            await uploadImages(req, res);
            await updateProduct(req, res);
        } 
        else if (method === 'DELETE') {
            await verifyToken(req, res);
            await isAdmin(req, res);
            await deleteProduct(req, res);
        } 
        else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = serverlessHandler;