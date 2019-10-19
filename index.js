/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');

mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'ice_cream_db',
})
    .then((connection) => {
      return createProduct(connection)
          .then(() => updateProduct(connection))
          .then(() => deleteProduct(connection))
          .then(() => readProducts(connection))
          .then(()=> connection.end());
    });


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
