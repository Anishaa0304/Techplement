//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Quotes", { useNewUrlParser: true, useUnifiedTopology: true });

const quoteSchema = {
  author: String,
  quote: String
};

const Quote = mongoose.model("Quote", quoteSchema);

///////////////////////////////////Requests Targeting all Quotes////////////////////////

app.route("/quotes")

.get(async function(req, res){
  try {
    const foundQuotes = await Quote.find();
    res.send(foundQuotes);
  } catch (err) {
    res.send(err);
  }
})

.post(async function(req, res){
  const newQuote = new Quote({
    author: req.body.author,
    quote: req.body.quote
  });

  try {
    await newQuote.save();
    res.send("Successfully added a new quote.");
  } catch (err) {
    res.send(err);
  }
})

.delete(async function(req, res){
  try {
    await Quote.deleteMany();
    res.send("Successfully deleted all quotes.");
  } catch (err) {
    res.send(err);
  }
});

////////////////////////////////Requests Targeting A Specific Quote////////////////////////

app.route("/quotes/:quoteAuthor")

.get(async function(req, res){
  try {
    const foundQuote = await Quote.findOne({ author: req.params.quoteAuthor });
    if (foundQuote) {
      res.send(foundQuote);
    } else {
      res.send("No quote matching that author was found.");
    }
  } catch (err) {
    res.send(err);
  }
})

.put(async function(req, res){
  try {
    const result = await Quote.updateOne(
      { author: req.params.quoteAuthor },
      { author: req.body.author, quote: req.body.quote },
      { overwrite: true }
    );
    if (result.modifiedCount > 0) {
      res.send("Successfully updated the selected quote.");
    } else {
      res.send("No quote was updated.");
    }
  } catch (err) {
    res.send(err);
  }
})

.patch(async function(req, res){
  try {
    const result = await Quote.updateOne(
      { author: req.params.quoteAuthor },
      { $set: req.body }
    );
    if (result.modifiedCount > 0) {
      res.send("Successfully updated quote.");
    } else {
      res.send("No quote was updated.");
    }
  } catch (err) {
    res.send(err);
  }
})

.delete(async function(req, res){
  try {
    const result = await Quote.deleteOne(
      { author: req.params.quoteAuthor }
    );
    if (result.deletedCount > 0) {
      res.send("Successfully deleted the corresponding quote.");
    } else {
      res.send("No quote was deleted.");
    }
  } catch (err) {
    res.send(err);
  }
});

////////////////////////////////Request for a Random Quote////////////////////////

app.route("/random-quote")

.get(async function(req, res){
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);
    res.send(randomQuote);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
