const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Maewing = require("./models/maewing.js");
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

app.post("/maewing", async (req, res) => {
  const createdMaewing = await Maewing.create(req.body);
  res.json(createdMaewing);
});

app.delete('/maewing/:Id', async (req, res) => {
	const deletedMaewing = await Maewing.findByIdAndDelete(req.params.Id);
    res.json(deletedMaewing);
});

app.put('/maewing/:Id', async (req, res) => {
    const updatedMaewing = await Maewing.findByIdAndUpdate(req.params.Id, req.body, {new:true});
    res.json(updatedMaewing);
})

app.get("/maewing", async (req, res) => {
  const {search} = req.query;
  console.log("Search Query", search);
  let foundMaewings;
  if(search) {
    foundMaewings = await Maewing.find({});
  } else {
    "no maewings found"
  }
  console.log("Found MaeWing:", foundMaewings)
  res.json(foundMaewings);
});

app.listen(3000, () => {
  console.log("The express app is ready!");
});
