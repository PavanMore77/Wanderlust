if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const DB_URL = process.env.ATLASDB_URL;

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => { console.log("connected to DB"); })
  .catch((err) => { console.log(err); });

async function main() {
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "69c510257d32936e797b0acd"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
