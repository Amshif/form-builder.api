const mongoose = require('mongoose');
require('dotenv').config(); 

exports.connectDB = () => {
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};

