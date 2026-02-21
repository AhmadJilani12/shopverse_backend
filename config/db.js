const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
        }
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        throw new Error('Database connection failed');
    }
};

module.exports = connectDB;