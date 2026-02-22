const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins (you can restrict it later)
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Food Website API!');
});

//mongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://frank:munchies@munchiesgarden.3buejj9.mongodb.net/?retryWrites=true&w=majority&appName=munchiesgarden';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
  
      // create a collection of documents
      const foodCollections = client.db("FoodInventory").collection("foods");
      const ordersCollection = client.db("FoodInventory").collection("orders");


  
      // insert a data into db using post method
      app.post('/upload-food', async(req,res) => {
        const data = req.body;
        const result = await foodCollections.insertOne(data);
        res.send(result);
      })
  
      // update a data using patch or update
      app.patch('/food/:id', async(req,res) => {
        const id = req.params.id;
        const updateFoodData = req.body;
        const filter = {
          _id: new ObjectId(id)
        };
  
        const updateDoc = {
          $set: {
            ...updateFoodData
          }
        }
        const options = {
          upsert : true
        };
        const result = await foodCollections.updateOne(filter, updateDoc,options);
        res.send(result);
  
  
      })
  
      // POST a new order
      app.post('/orders', async (req, res) => {
        try {
          const orderData = req.body;
          const result = await ordersCollection.insertOne(orderData);
          // Include the insertedId in the response
          res.status(201).json({ _id: result.insertedId });
        } catch (err) {
          console.error("Error saving order:", err);
          res.status(500).json({ message: "Failed to save order" });
        }
      });
      

    app.patch('/orders/:id', async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
    
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Order ID" });
      }
    
      try {
        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: status } }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        res.status(200).json({ message: "Order status updated" });
      } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    
    app.get('/orders', async (req, res) => {
      try {
        const result = await ordersCollection.find().toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Failed to fetch orders" });
      }
    });

    app.get('/all-foods',async(req,res) => {
      let query = {};
      if(req.query?.category){
        query = {category: req.query.category}
      }
      const result = await foodCollections.find(query).toArray();
      res.send(result);

    })

    // to get single food data
    app.get('/food/:id',async(req,res) => {
      const id = req.params.id;
      const filter = {
        _id : new ObjectId(id)
      }
      const result = await foodCollections.findOne(filter);
      res.send(result);
    })

    // delete a food using delete
    app.delete('/food/:id',async(req,res) => {
      const id = req.params.id;
      const filter = {
        _id : new ObjectId(id)
      }
      const result = await foodCollections.deleteOne(filter);
      res.send(result);
    })

    // server.js or routes/orders.js
    app.delete('/orders/:id', async (req, res) => {
      const { id } = req.params;
    
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Order ID" });
      }
    
      try {
        const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        res.status(200).json({ message: "Order deleted successfully" });
      } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
}
run().catch(console.dir);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
