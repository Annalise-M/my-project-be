const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const authRoutes = createAuthRoutes();


app.use('/auth', authRoutes);
app.use('/api', ensureAuth);

app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});


const fakeUser = {
  id: 1,
  email: 'jon@arbuckle.net',
  hash: '42r8c24',
};


app.get('/posters', async(req, res) => {
  const data = await client.query(`
    SELECT p.id, name, description, in_stock, c.year AS categories_year, price 
      FROM posters AS p
      JOIN categories AS c
      ON p.categories_id = c.id
    `);

  res.json(data.rows);
});


app.get('/categories', async(req, res) => {
  const data = await client.query(`
    SELECT * FROM categories`);

  res.json(data.rows);
});


app.get('/posters/:id', async(req, res) => {
  const posterId = req.params.id;

  const data = await client.query(`
    SELECT p.id, name, description, in_stock, c.year AS categories_year, price 
      FROM posters AS p
      JOIN categories AS c
      ON p.categories_id = c.id
      WHERE p.id = $1`, [posterId]);

  res.json(data.rows[0]);
});


app.delete('/posters/:id', async(req, res) => {
  const posterId = req.params.id;

  const data = await client.query('DELETE FROM posters WHERE posters=$1;', [posterId]);

  res.json(data.rows[0]);
});
  

// cr_UPDATE_d
app.put('/posters/:id', async(req, res) => {
  const posterId = req.params.id;

  try {
    const updatedPoster = {
      name: req.body.name,
      description: req.body.description,
      in_stock: req.body.in_stock,
      categories_id: req.body.categories_id,
      price: req.body.price
    };
  
    const data = await client.query(`
      UPDATE posters
        SET name=$1, description=$2, in_stock=$3, categories_id=$4, price=$5
        WHERE posters.id = $6
        RETURNING *
  `, [updatedPoster.name, updatedPoster.description, updatedPoster.in_stock, updatedPoster.categories_id, updatedPoster.price, posterId]); 
    
    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }});


app.post('/posters', async(req, res) => {
  try {
    const realNewPoster = {
      name: req.body.name,
      description: req.body.description,
      in_stock: req.body.in_stock,
      categories_id: req.body.categories_id,
      price: req.body.price
    };
  
    const data = await client.query(`
    INSERT INTO posters(name, description, in_stock, categories_id, price)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
  `, [realNewPoster.name, realNewPoster.description, fakeUser.id, realNewPoster.in_stock, realNewPoster.price]); 
    
    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;



