const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const BookSchema = new Schema({
  book: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  isbn: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
});

module.exports = Book = mongoose.model("book", BookSchema);
