require('dotenv').config();
require('./lib/client').connect();

// const client = require('./lib/client');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {

  console.log(`Started on ${PORT}`);

});






// app.get('/posters', async(req, res) => {
//   const data = await client.query('SELECT * from posters');

//   res.json(data.rows);
// });


// app.get('/posters/:name', async(req, res) => {

//   const name = req.params.name;
//   console.log('name', name);
//   const data = await client.query('SELECT * from posters where name=$1', [name]);
//   console.log('data', data);
//   res.json(data.rows);
// });


// app.put('/posters/:id', async(req, res) => {
//   try {
//     const data = await client.query(`
//     UPDATE posters
//     SET in_stock = TRUE
//     WHERE id=$1
//     RETURNING *`, [req.params.id]);
//     res.json(data);
//   } catch(e) {
//     res.json(e);
//   }
// });


// app.post('/posters/', async(req, res) => {
//   try {
//     const data = await client.query(`
//     INSERT INTO posters (poster_name, poster_description, poster_in_stock, poster_category, poster_price)
//     VALUES ($1, $2, $3, $4, $5
//     RETURNING *`,
//     [req.body.poster_name, req.body.poster_description, req.body.poster_in_stock, req.poster_category, req.poster_price]
//     );
//     res.json(data);
//   } catch(e) {
//     res.json(e);
//   }
// });


// app.delete('/posters/:id', async(req, res) => {
//   try {
//     const data = await client.query(`
//     DELETE
//     FROM posters
//     SET in_stock = TRUE
//     WHERE id=$1
//     RETURNING *`, [req.params.id]);
//     res.json(data);
//   } catch(e) {
//     res.json(e);
//   }
// });


// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Started on ${PORT}`);
// });

// module.exports = app;

