import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

env.config();
const PORT = process.env.PORT || 3000;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  });

db.connect();

async function updateDatabase(name, contact, address){
  const datetime = new Date();
  await db.query(
    "INSERT INTO Estimates (name, contact, address, estimatetime) VALUES ($1, $2, $3, $4)",
    [name, contact, address, datetime]
  );
  try{
    console.log("insert success");
  }catch(err) {
      console.log(err);
  };
}

app.post("/", (req, res) => {
    console.log("here");
    res.send("success");
    const name = req.body.custName;
    const contact = req.body.custContact;
    const address = req.body.custAddress;
    updateDatabase(name, contact, address);
  });

app.listen(PORT, () => console.log(`Server started  ${PORT}`));