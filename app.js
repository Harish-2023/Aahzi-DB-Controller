const express = require("express");
const app = express();
require("dotenv").config();

const { MongoClient } = require("mongodb");

async function serverToDBConnection() {
  try {
    const client = new MongoClient(
      process.env.MONGODB_URL
      //     {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    );
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("test");
    const cutoff_collection = database.collection("CutOff");
    const rank_collection = database.collection("Rank");
    app.use(express.json());

    app.get("/cutoff", async (req, res) => {
      try {
        const cutoff_data = await cutoff_collection.find({}).toArray();
        res.json(cutoff_data);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/rank", async (req, res) => {
      try {
        const rank_data = await rank_collection.find({}).toArray();
        res.json(rank_data);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });


  } catch (error) {
    console.log(error);
  }
}

app.listen(8080, (req, res, error) => {
  if (error) throw new Error("New Error => PORT Conn. Error", error);
  console.log("Port is listening in 8080");
});

serverToDBConnection();
