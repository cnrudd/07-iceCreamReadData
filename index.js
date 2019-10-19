/**
 * @see {@link https://www.npmjs.com/package/mysql}
 */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'ice_cream_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  doCRUD();
});

/**
 * Called by callback function upon successful establishment of DB connection.
 * @see {@link https://www.npmjs.com/package/mysql#performing-queries}
 */
function doCRUD() {
  createProduct();
}

/**
 * Adds a row to DB
 */
function createProduct() {
  console.log('Inserting a new product...\n');
  const query = connection.query(
      'INSERT INTO products SET ?',
      {
        flavor: 'Rocky Road',
        price: 3.0,
        quantity: 50,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        // Call updateProduct AFTER the INSERT completes
        updateProduct();
      }
  );

  // logs the actual query being run
  console.log(query.sql);
}

/**
 * Updates a row in the DB
 */
function updateProduct() {
  console.log('Updating all Rocky Road quantities...\n');
  const query = connection.query(
      'UPDATE products SET ? WHERE ?',
      [
        {
          quantity: 100,
        },
        {
          flavor: 'Rocky Road',
        },
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' products updated!\n');
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
  );

  // logs the actual query being run
  console.log(query.sql);
}

/**
 * Deletes a row from the DB
 */
function deleteProduct() {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
      'DELETE FROM products WHERE ?',
      {
        flavor: 'strawberry',
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' products deleted!\n');
        // Call readProducts AFTER the DELETE completes
        readProducts();
      }
  );
}

/**
 * Reads all products from the DB
 */
function readProducts() {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
