const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;
  books;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT authors.name, authors.dob, authors.pob, 
      COALESCE(json_agg(books)
      FILTER (WHERE books.id IS NOT NULL), '[]')
      as books from authors
      LEFT JOIN books_authors on authors.id = books_authors.author_id
      LEFT JOIN books on books_authors.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }


  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob ) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob] 
    );
    return new Author(rows[0]);
  }



};
