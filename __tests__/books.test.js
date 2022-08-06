const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('test routes for books and authors', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
    
    
  it('/books should display list of books', async () => {
    const res = await request(app).get('/books');
    
    expect(res.body).toEqual([
      {
        id: '1',
        title: 'ten buck two',
        released: '2000',

      },
      {
        id: '2',
        title: 'crossroads',
        released: '2001'
      },
      {
        id: '3',
        title: 'wonders of electricity',
        released: '2002'
      },
      {
        id: '4',
        title: 'the book of shamless',
        released: '2003'
      },
    ]);
  }); 
      
    
  it('/books/:id should return book details with authors', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      title: 'ten buck two',
      released: '2000',
      authors: [
        {
          id: 1,
          name: 'tom lawyer',
          dob: '8-jun-1772',
          pob: 'west england',
        },
      ],
    });
  });
  
  it('POST /books should create a new books', async () => {
    const resp = await request(app).post('/books').send({
      title: 'the story of the army man',
      released: '1875'
    });
    console.log(resp.body);
    expect(resp.body.title).toBe('the story of the army man');
    expect(resp.body.released).toBe('1875');
      
  });
  
  afterAll(() => {
    pool.end();
  });
  
}); 

