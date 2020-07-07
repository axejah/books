const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const books = require("./routes/api/books");

require("dotenv").config();

const app = express();

// BodyParser middleware
app.use(bodyParser.json());

// connect to db
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/books", books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
