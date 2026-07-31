const mongoose = require('mongoose');

let useLocalDB = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    useLocalDB = false;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Falling back to local JSON database...');
    useLocalDB = true;
  }
};

const isLocalDB = () => useLocalDB;

module.exports = { connectDB, isLocalDB };
