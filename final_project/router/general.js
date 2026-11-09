const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Task 10: Get all books available in the shop using Async/Await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        res.status(200).json(response.data);
    } catch (error) {
        // Fallback to local data if mock external server isn't up
        res.status(200).send(JSON.stringify(books, null, 4));
    }
});

// Task 11: Get book details based on ISBN using Promises with Axios
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (books[isbn]) {
                res.status(200).json(books[isbn]);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        });
});
  
// Task 12: Get book details based on Author using Async/Await with Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author.toLowerCase();
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        res.status(200).json(response.data);
    } catch (error) {
        const keys = Object.keys(books);
        const filtered = keys.filter(k => books[k].author.toLowerCase() === author).map(k => books[k]);
        if (filtered.length > 0) {
            res.status(200).json(filtered);
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    }
});

// Task 13: Get all books based on Title using Promises with Axios
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            const keys = Object.keys(books);
            const filtered = keys.filter(k => books[k].title.toLowerCase() === title).map(k => books[k]);
            if (filtered.length > 0) {
                res.status(200).json(filtered);
            } else {
                res.status(404).json({ message: "Title not found" });
            }
        });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) res.status(200).json(books[isbn].reviews);
    else res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
