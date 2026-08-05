const mongoose = require('mongoose');

let useLocalDB = false;
let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    useLocalDB = false;
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not found. Falling back to local/in-memory DB mode...');
    useLocalDB = true;
    return null;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
  }

  try {
    const conn = await cachedPromise;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    useLocalDB = false;
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Falling back to local JSON database...');
    cachedPromise = null;
    useLocalDB = true;
    return null;
  }
};

const isLocalDB = () => useLocalDB;

module.exports = { connectDB, isLocalDB };

