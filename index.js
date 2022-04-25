const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0eew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // প্রথমেই উপরের ক্লায়েন্টকে কানেক্ট করতে হয়।
    await client.connect();
    // make a collection it could be products, users etc but in this case we named it productCollection
    const productCollection = client.db('emaJohn').collection('product');

    // now if you to load data then you must make a api which method will be get
    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // product count
    app.get('/productCount', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const count = await cursor.count();
      res.send({ count });
    });
  } finally {
  }
}
run().catch(console.dir);

// API
app.get('/', (req, res) => {
  res.send('Welcome to Ema-John Server Side!!');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
