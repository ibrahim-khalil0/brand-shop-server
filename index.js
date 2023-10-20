const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()

const cors = require('cors')
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



// mdibrahimkhalil0183
// 4GSmxN618S0ouXUt



const uri = "mongodb+srv://mdibrahimkhalil0183:4GSmxN618S0ouXUt@cluster0.bqms9ir.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    const productsCollection = client.db('productsDB').collection('products')


    app.get('/products/:brand_name', async (req, res) => {
        const brand = req.params.brand_name;
        console.log(brand);
    
        try {
            const cursor = productsCollection.find({ brand: brand }); // Filter data based on the brand name
            const result = await cursor.toArray();
            res.json(result); // Send the filtered data as a JSON response
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' }); // Handle errors appropriately
        }
    });
    
    app.get('/products/:brand_name/:id', async (req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const product = await productsCollection.findOne(query)
      console.log(product)
      res.send(product)
    })

    app.post('/products', async(req, res) => {
        const newProduct = req.body
        console.log(newProduct)
        const result = await productsCollection.insertOne(newProduct)
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('user running')
})

app.listen(port, () => {
    console.log('server running')
})