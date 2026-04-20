const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const sampleData = initData.data.map((obj) => ({ ...obj, owner: "69e59d9feb9bf60277463d81" }));

  await Listing.insertMany(sampleData);
  console.log("data was initialized");
};

main()
  .then(() => {
    console.log("connected to DB");
    return initDB();
  })
  .then(() => { mongoose.connection.close(); })
  .catch((err) => { console.log(err); });
