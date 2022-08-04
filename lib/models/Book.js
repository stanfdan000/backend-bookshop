const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;
  authors;


  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors;
  }


  static async getAll() {
    const { rows } = await pool.query('SELECT id, title, released FROM books;');
    return rows.map((row) => new Book(row));
  }





  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT books.title, books.released, COALESCE(json_agg(authors))
      FILTER (WHERE authors.id IS NOT NULL), '[]')
      as authors from books
      LEFT JOIN books_authors on books.id = books_author.book_id
      LEFT JOIN authors on books_authors.authors_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }

  
  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books(title, released,) VALUES ($1, $2,) RETURNING *',
      [title, released] 
    );
    return new Book(rows[0]);
  }






    
};
