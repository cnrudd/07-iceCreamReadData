/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');

/**
 * Bring DB config in from separate file
 * to keep logic clean.
 */
const conf = require('./config.js');

/**
 * Main entry point to script
 * This is an 'async' function
 * @see {@link https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
 */
async function run() {
  const connection = await mysql.createConnection(conf);

  await createProduct(connection);
  await updateProduct(connection);
  await deleteProduct(connection);
  await readProducts(connection);
  connection.end();
}

run();


/**
 * Adds a row to DB
 * @param {Promise} connection
 * @return {Promise}
 */
function createProduct(connection) {
  console.log('Inserting a new product...\n');
  return connection.query(
      'INSERT INTO products SET ?',
      {
        flavor: 'Rocky Road',
        price: 3.0,
        quantity: 50,
      })
      .then((res) => {
        console.log(res.affectedRows + ' product inserted!\n');
      });
}

/**
 * Updates a row in the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function updateProduct(connection) {
  console.log('Updating all Rocky Road quantities...\n');
  return connection.query(
      'UPDATE products SET ? WHERE ?',
      [
        {
          quantity: 100,
        },
        {
          flavor: 'Rocky Road',
        },
      ])
      .then((res) => {
        console.log(res.affectedRows + ' products updated!\n');
      });
}

/**
 * Deletes a row from the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function deleteProduct(connection) {
  console.log('Deleting all strawberry icecream...\n');
  return connection.query(
      'DELETE FROM products WHERE ?',
      {
        flavor: 'strawberry',
      })
      .then((res) => {
        console.log(res.affectedRows + ' products deleted!\n');
      });
}

/**
 * Reads all products from the DB
 * @param {Promise} connection
 * @return {Promise}
 */
function readProducts(connection) {
  console.log('Selecting all products...\n');
  return connection.query('SELECT * FROM products')
      .then((res) => {
        console.log(res);
      });
}
