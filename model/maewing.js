const mongoose = require('mongoose');

const maewingSchema = mongoose.Schema({
  Name: String,
  age: Number,
  color: String,
});

const Maewing = mongoose.model('Maewing', maewingSchema);
module.exports = Maewing;
