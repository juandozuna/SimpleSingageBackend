const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const frameworkSchema = new Schema({
  title: String,
  disabled: Boolean
});

const Framework = module.exports = mongoose.model('Framework', frameworkSchema);