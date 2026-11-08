const express = require('express');
let books = {
  "1": {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {"user1": "Great read!"} },
  "2": {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  "3": {"author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
  "4": {"author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
  "5": {"author": "Unknown", "title": "The Book Of Job", "reviews": {} }
};
const public_users = express.Router();

// Task 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
  return res.status(200).json(books);
});

// Task 11: Get book details by ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    books[isbn] ? resolve(books[isbn]) : reject("Not found");
  })
  .then(book => res.status(200).json(book))
  .catch(err => res.status(404).json({message: err}));
});
  
// Task 12: Get books by Author using Async/Await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author.toLowerCase();
  const matched = Object.values(books).filter(b => b.author.toLowerCase() === author);
  return res.status(200).json(matched);
});

// Task 13: Get books by Title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  new Promise((resolve) => {
    resolve(Object.values(books).filter(b => b.title.toLowerCase() === title));
  })
  .then(results => res.status(200).json(results));
});

module.exports = { general: public_users };
