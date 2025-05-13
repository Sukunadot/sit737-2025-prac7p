const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongouser:password123@mongodb-service:27017/?authSource=admin';
const dbName = 'myapp';
let db;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

/**
 * CRUD Routes
 */

// Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Get item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Create item
app.post('/items', async (req, res) => {
  try {
    const result = await db.collection('items').insertOne(req.body);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Update item
app.put('/items/:id', async (req, res) => {
  try {
    const result = await db.collection('items').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).send('Item not found');
    res.send('Item updated');
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Delete item
app.delete('/items/:id', async (req, res) => {
  try {
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send('Item not found');
    res.send('Item deleted');
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
