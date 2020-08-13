const client = require('../lib/client');
// import our seed data:
const posters = require('./posters.js');
const usersData = require('./users.js');


run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      posters.map(poster => {
        return client.query(`
                    INSERT INTO posters (name, description, in_stock, category, price, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [poster.name, poster.description, poster.in_stock, poster.category, poster.price, user.id]);
      })
    );
    

    // console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}

