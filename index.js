const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3200;

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//app.get("/", (req, res) => {
// res.send("Welcome to Red Onion Backend Server");
//});

app.get("/foods", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      const collection = client.db("hotOnionRestaurant").collection("foods");
      collection
        .find()
        .limit(6)
        .toArray((err, documents) => {
          if (err) {
            console.log(rej);
            res.status(500).send({ message: err });
          } else {
            res.send(documents);
          }
          // client.close();
        });
    }
  });
});

app.get("/orders", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("orders");

    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });

    //client.close();
  });
});

app.get("/food/:id", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const foodId = Number(req.params.id);

  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("foods");
    console.log(foodId);
    collection.find({ id: foodId }).toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        res.send(documents[0]);
      }
      //client.close();
    });
  });
});

app.get("/features", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("features");
    collection
      .find()
      .limit(3)
      .toArray((err, documents) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });
  });
});

app.post("/submitOrder", (req, res) => {
  const data = req.body;
  console.log(data);
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("orders");
    collection.insert(data, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
});

app.post("/addFood", (req, res) => {
  const data = req.body;
  console.log(data);
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("foods");
    collection.insert(data, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops);
      }
    });
  });
});
app.post("/addFeatures", (req, res) => {
  const data = req.body;
  console.log(data);
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("hotOnionRestaurant").collection("features");
    collection.insert(data, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops);
      }
    });
  });
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("Listeing for port :", port);
});
