const express = require("express");
const router = express.Router();

//item model
const Book = require("../../models/Book");

// @ROUTE GET api/books
// @desc Get all books
// @access Public
router.get("/", (req, res) => {
  Book.find().then((items) => {
    res.json(items);
  });
});

// @ROUTE POST api/books
// @desc Create a book
// @access Public
router.post("/", (req, res) => {
  const newBook = new Book({
    book: req.body.book,
    isbn: req.body.isbn,
    date: req.body.date,
    description: req.body.description,
    progress: req.body.progress,
  });

  newBook
    .save()
    .then((book) => res.json(book))
    .catch((err) => {
      if (err.code === 11000) {
        res.json({
          success: false,
          reason: "Book already exists",
          code: "duplicate",
        });
      } else {
        res.json(err.json);
      }
    });
});

// @ROUTE DELETE api/books/:id
// @desc Delete a book
// @access Public
router.delete("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => book.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @ROUTE POST api/books/progress/:id
// @desc update progress on a book
// @access Public
router.post("/progress/:id", (req, res) => {
  Book.findById(req.params.id).then((book) => {
    book.progress = req.body.progress;

    book
      .save()
      .then(() => res.json("progress updated"))
      .catch((err) => res.json(err));
  });
});

module.exports = router;
