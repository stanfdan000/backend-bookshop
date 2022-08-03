const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const addAuthor = await Author.insert(res.body);
      res.json(addAuthor);
    } catch (e) {
      next(e);
    }
  })


  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorDetail = await Author.getAuthorById(id);
      res.json(authorDetail);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const authorList = await Author.getAll();
      res.json(authorList);
    } catch (e) {
      next(e);
    }
  });

