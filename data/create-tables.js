const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );           
                CREATE TABLE categories (
                  id SERIAL PRIMARY KEY NOT NULL,
                  year VARCHAR(256) NOT NULL
                );
                CREATE TABLE posters (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    description VARCHAR(512) NOT NULL, 
                    in_stock BOOLEAN NOT NULL,
                    price INTEGER NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id),
                    categories_id INTEGER NOT NULL REFERENCES categories(id)
            );
        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}

