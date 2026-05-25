const pool = require('../config/db');

const CheckupModel = {
  findByVehicle: async (vehicleId) => {
    const { rows } = await pool.query(
      `SELECT c.*, u.name as inspector_name
       FROM checkups c
       LEFT JOIN users u ON c.inspector_id = u.id
       WHERE c.vehicle_id = $1
       ORDER BY c.check_date DESC`,
      [vehicleId]
    );
    return rows;
  },
  findLatest: async (limit = 5) => {
    const { rows } = await pool.query(
      `SELECT c.*, v.plate, v.model, u.name as inspector_name
       FROM checkups c
       LEFT JOIN vehicles v ON c.vehicle_id = v.id
       LEFT JOIN users u ON c.inspector_id = u.id
       ORDER BY c.check_date DESC
       LIMIT $1`,
      [limit]
    );
    return rows;
  },
  create: async ({ vehicle_id, inspector_id, brakes, lights, tires, frame, overall_status, notes }) => {
    const { rows } = await pool.query(
      `INSERT INTO checkups (vehicle_id, inspector_id, brakes, lights, tires, frame, overall_status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [vehicle_id, inspector_id, brakes, lights, tires, frame, overall_status, notes]
    );
    return rows[0];
  },
};

module.exports = CheckupModel;
