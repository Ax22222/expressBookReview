const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Retrieve all books available in the shop
public_users.get('/', function (req, res) {
    res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN code
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) res.status(200).json(books[isbn]);
    else res.status(404).json({ message: "Book not found" });
});
  
// Get book details based on Author name
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const keys = Object.keys(books);
    const filtered = keys.filter(k => books[k].author.toLowerCase() === author).map(k => books[k]);
    if (filtered.length > 0) res.status(200).json(filtered);
    else res.status(404).json({ message: "Author not found" });
});

// Get book details based on Book Title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    const keys = Object.keys(books);
    const filtered = keys.filter(k => books[k].title.toLowerCase() === title).map(k => books[k]);
    if (filtered.length > 0) res.status(200).json(filtered);
    else res.status(404).json({ message: "Title not found" });
});

// Get book reviews/comments based on ISBN code
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) res.status(200).json(books[isbn].reviews);
    else res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
