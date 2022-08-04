const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router() 
  .post('/', async (req, res, next) => {
    try {
      const addBook = await Book.insert(req.body);
      if (req.body.authorIds) {
        await Promise.all(
          req.body.authorIds.map((id) => addBook.addAuthorById(id))
        );
      }
      res.json(addBook);
    } catch (e) {
      next(e);

    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookDetail = await Book.getBookById(id);
      res.json(bookDetail);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const bookList = await Book.getAll();
      res.json(bookList);
    } catch (e) {
      next(e);
    }
  });
  











