const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('test routes for books and authors', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
  
  
    it('/authors should display list of authors', async () => {
      const res = await request(app).get('/authors');
  
     expected(res.body).toEqual([
        {
            id: '1',
            name: 'tom lawyer'
        },
        {
            id: '2',
            name: 'billy bob'
        },
        {
            id: '3',
            name: 'mike watts'
        },
        {
            id: '4',
            name: 'lip galmore'
        },
     ]);
    }); 
    
  
    it('authors/:id should return author details with books', async () => {
      const res = await request(app).get('/authors/1');
       expect(res.body).toEqual({
        name: 'tom lawyer',
        dob: '8-jun-1772',
        pob: 'west england',
        books: [
            {
                id: 1,
                title: 'walking alone to the end',
                released: 1800, 

            }
        ],
      });


      it('POST /authors should create a new author', async () => {
        const resp = await request(app).post('/authors').send({
            name: 'rod brown',
            dob: '2-oct-1975',
            pob: 'boise, idaho'
        });
        expect(res.body.name).toBe('rod brown');
        expect(res.body.dob).toBe('2-oct-1975');
        expect(res.body.pob).toBe('boise idaho');
      });
      afterAll(() => {
        pool.end();
      });
    });
  
  });

    





  