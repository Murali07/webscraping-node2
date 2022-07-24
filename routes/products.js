import express from "express";
import { client } from "../index.js";
const router = express.Router();

router.get("/", async function(request, response) {

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
  
  router.get("/:_id", async function (request, response) {
    const {_id} = request.params;
    console.log(request.params, _id);   
  
    const result = await client.db("test").collection("electronics").findOne({ _id: _id });
    console.log(result);
  
    result ? response.send(result) : response.send({ msg: "Product not found" });
    
  });
  
  
  router.post("/", async function(request, response) {
  
    const data = request.body;
    //db.electronics.insertMany(data)
  
    console.log(data);
  
    const result = await client
      .db("test")
      .collection("electronics")
      .insertMany(data);
  
    response.send(result);
  })
  
  
  router.put("/:_id", async function(request, response) {
  
    const {_id} = request.params;
    const data = request.body;
    
    const result = await client
    .db("test")
    .collection("electronics")
    .updateOne({ _id: _id }, { $set: data });
  
    response.send(result);
  })
  
  router.delete("/:_id", async function (request, response) {
    const {_id} = request.params;
    console.log(request.params, _id); 
    
  
    const result = await client.db("test").collection("electronics").deleteOne({ _id: _id });
    console.log(result);
  
    result.deletedCount > 0 ? response.send({msg: "Product Deleted Successfully!"}) : response.send({ msg: "Product not found" });
    
  });


  export const productsRouter = router;
  