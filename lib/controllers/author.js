const { Router } = require('express');
const Author = require('../models/Authors');

module.exports = Router()
.post('/', async (req, res, next) => {
    try {
        const addAuthor = await Author.
    }
})
