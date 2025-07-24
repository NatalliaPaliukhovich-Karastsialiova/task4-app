const pool = require('../db');

exports.createUser = async (email, hashedPassword, first_name, last_name, company_name, job_title) => {
  const query = `
    INSERT INTO users (email, password, first_name, last_name, company_name, job_title)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;
  const result = await pool.query(
    query,
    [email, hashedPassword, first_name, last_name, company_name, job_title]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

exports.updateLastLogin = async (email) => {
  const query = `
    UPDATE users SET last_login = CURRENT_TIMESTAMP
    WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows;
};

exports.getAllUsers = async () => {
  const query = `
    SELECT id, first_name, last_name, email, company_name, job_title, status, created_on, last_login
    FROM users
    ORDER BY last_login DESC NULLS LAST
  `;
  const result = await pool.query(query);
  return result.rows;
};

exports.blockUsers = async (userIds) => {
  const query = `UPDATE users SET status = 'blocked' WHERE email = ANY($1)`;
  await pool.query(query, [userIds]);
};

exports.unblockUsers = async (userIds) => {
  const query = `UPDATE users SET status = 'active' WHERE email = ANY($1)`;
  await pool.query(query, [userIds]);
};

exports.deleteUsers = async (userIds) => {
  const query = `DELETE FROM users WHERE email = ANY($1)`;
  await pool.query(query, [userIds]);
};
