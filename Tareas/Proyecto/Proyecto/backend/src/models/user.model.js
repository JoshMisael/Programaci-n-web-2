const pool = require('../config/db');

const UserModel = {
  findByEmail: async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },
  create: async ({ name, email, passwordHash, role = 'operator' }) => {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
      [name, email, passwordHash, role]
    );
    return rows[0];
  },
};

module.exports = UserModel;
