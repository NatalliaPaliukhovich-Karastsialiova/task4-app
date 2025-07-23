const pool = require('../db');

exports.createUser = async (email, hashedPassword, first_name, last_name) => {
  const result = await pool.query(
    'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id',
    [email, hashedPassword, first_name, last_name]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
