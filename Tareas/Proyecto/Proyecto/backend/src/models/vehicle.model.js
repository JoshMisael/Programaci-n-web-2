const pool = require('../config/db');

const VehicleModel = {
  findAll: async () => {
    const { rows } = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
    return rows;
  },
  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
    return rows[0];
  },
  create: async ({ plate, model, brand, year, color, status, owner_name, owner_phone }) => {
    const { rows } = await pool.query(
      `INSERT INTO vehicles (plate, model, brand, year, color, status, owner_name, owner_phone)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [plate, model, brand, year, color, status || 'active', owner_name, owner_phone]
    );
    return rows[0];
  },
  update: async (id, { plate, model, brand, year, color, status, owner_name, owner_phone }) => {
    const { rows } = await pool.query(
      `UPDATE vehicles SET plate=$1, model=$2, brand=$3, year=$4, color=$5,
       status=$6, owner_name=$7, owner_phone=$8 WHERE id=$9 RETURNING *`,
      [plate, model, brand, year, color, status, owner_name, owner_phone, id]
    );
    return rows[0];
  },
  remove: async (id) => {
    const { rows } = await pool.query('DELETE FROM vehicles WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },
  countByStatus: async () => {
    const { rows } = await pool.query(
      `SELECT status, COUNT(*)::int as count FROM vehicles GROUP BY status`
    );
    return rows;
  },
};

module.exports = VehicleModel;
