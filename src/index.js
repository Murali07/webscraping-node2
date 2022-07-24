import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// // import {moviesRouter} from "./routes/movies.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5000;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

// const MONGO_URL = "mongodb://localhost";

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

const mobiles = [
  {
    img: "https://rukminim1.flixcart.com/image/312/312/l1dwknk0/mobile/f/t/x/-original-imagcyj4unsxhadw.jpeg?q=70",
    title: "realme C31 (Light Silver, 32 GB)",
    rating: "4.6",
    price: "10,999",
    final_price: "8,999"
  },
  {
    img: "https://rukminim1.flixcart.com/image/312/312/ku4ezrk0/mobile/p/e/4/c31-mzb0a0jin-poco-original-imag7bzqxgdhgf2n.jpeg?q=70",
    title: "POCO C31 (Royal Blue, 64 GB)",
    rating: "4.4",
    price: "11,999",
    final_price: "7,999"
  },
  {
    img: "https://rukminim1.flixcart.com/image/312/312/l4n2oi80/mobile/x/o/a/-original-imagfhu75eupxyft.jpeg?q=70",
    title: "SAMSUNG Galaxy F13 (Waterfall Blue, 64 GB)",
    rating: "4.1",
    price: "14,999",
    final_price: "11,999"
  },
  {
    img: "https://rukminim1.flixcart.com/image/312/312/kg8avm80/mobile/r/h/z/apple-iphone-12-dummyapplefsn-original-imafwg8duby8qbn4.jpeg?q=70",
    title: "APPLE iPhone 12 (Black, 128 GB)",
    rating: "4.6",
    price: "70,900",
    final_price: "56,999"
  },
 {
    img: "https://m.media-amazon.com/images/I/81OZGH4fZiL._SX522_.jpg",
    title: "Redmi 10 Power (Sporty Orange, 8GB RAM, 128GB Storage)",
    rating: "3.6",
    price: "18,999",
    final_price: "14,999"
  },
  {
    img: "https://m.media-amazon.com/images/I/71geVdy6-OS._SX522_.jpg",
    title: "OPPO A74 5G (Fantastic Purple,6GB RAM,128GB Storage)",
    rating: "4.2",
    price: "20,990",
    final_price: "14,990"
  },
 {
    img: "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SX522_.jpg",
    title: "OnePlus Nord CE 2 5G (Bahamas Blue, 8GB RAM, 128GB Storage)",
    rating: "4.3",
    price: "33,999",
    final_price: "24,999"
  },
  {
    img: "https://m.media-amazon.com/images/I/71BZ2hz0IZL._SX522_.jpg",
    title: "Nokia G21 Android Smartphone",
    rating: "4.1",
    price: "15,999",
    final_price: "11,999"
  },
 {
    img: "https://m.media-amazon.com/images/I/41+sLJHyA8L._SY300_SX300_.jpg",
    title: "Vivo Y21G (Midnight Blue, 4GB RAM, 64GB ROM)",
    rating: "4",
    price: "17,990",
    final_price: "13,499"
  },
 {
    img: "https://m.media-amazon.com/images/I/413iZjGV3cL._SX522_.jpg",
    title: "Lava Agni 5G |64 MP AI Quad Camera| (8GB RAM/128 GB ROM)",
    rating: "4.3",
    price: "23,999",
    final_price: "15,999"
  },
]

app.get('/', function (request, response) {
  response.send('Welcome to My App')
})

app.get("/electronics", async function(request, response) {

  console.log(request.query);
  
  // // to convert string to number
  //   if(request.query.rating){
  //     request.query.rating = +request.query.rating;
  //   }
  //   else if(request.query.price){
  //     request.query.rating = +request.query.price;
  //   }
  //   else if(request.query.final_price){
  //     request.query.rating = +request.query.final_price;
  //   }

  // db.electronics.find({})

  const result = await client.db("test").collection("electronics").find(request.query).toArray();
  response.send(result);
})

app.get("/electronics/:_id", async function (request, response) {
  const {_id} = request.params;
  console.log(request.params, _id);   

  const result = await client.db("test").collection("electronics").findOne({ _id: _id });
  console.log(result);

  result ? response.send(result) : response.send({ msg: "Product not found" });
  
});


app.post("/electronics", async function(request, response) {

  const data = request.body;
  //db.electronics.insertMany(data)

  console.log(data);

  const result = await client
    .db("test")
    .collection("electronics")
    .insertMany(data);

  response.send(result);
})


app.put("/electronics/:_id", async function(request, response) {

  const {_id} = request.params;
  const data = request.body;
  
  const result = await client
  .db("test")
  .collection("electronics")
  .updateOne({ _id: _id }, { $set: data });

  response.send(result);
})

app.delete("/electronics/:_id", async function (request, response) {
  const {_id} = request.params;
  console.log(request.params, _id); 
  

  const result = await client.db("test").collection("electronics").deleteOne({ _id: _id });
  console.log(result);

  result.deletedCount > 0 ? response.send({msg: "Product Deleted Successfully!"}) : response.send({ msg: "Product not found" });
  
});


app.listen(PORT, () => console.log(`App started in ${PORT}`));










