const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1); // Server band ho jayega agar DB connect na ho
    }
};

module.exports = connectDB;