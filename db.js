const { MongoClient } = require('mongodb');

const uri = 'mongodb://mongouser:password123@mongodb-service:27017/?authSource=admin';

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('myapp'); // use your database name here
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectDB;
