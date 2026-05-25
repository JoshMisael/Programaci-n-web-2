-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'operator',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles (bicitaxis) table
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(20) UNIQUE NOT NULL,
  model VARCHAR(100),
  brand VARCHAR(100),
  year INT,
  color VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  owner_name VARCHAR(100),
  owner_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicle checkups table
CREATE TABLE IF NOT EXISTS checkups (
  id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
  inspector_id INT REFERENCES users(id),
  check_date TIMESTAMP DEFAULT NOW(),
  brakes VARCHAR(20),
  lights VARCHAR(20),
  tires VARCHAR(20),
  frame VARCHAR(20),
  overall_status VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed: admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Administrador', 'admin@bicitaxi.com', '$2b$10$Uu.Gq53Lb4m2IULz08tttOUvPzt9lUDgaaOk..UHjdPLj4Sn3xfRe', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Seed: 5 sample vehicles
INSERT INTO vehicles (plate, model, brand, year, color, status, owner_name, owner_phone) VALUES
  ('BT-001', 'CargoBike Pro', 'TaxiCycle', 2021, 'Amarillo', 'active', 'Carlos Mendoza', '555-0101'),
  ('BT-002', 'UrbanRider X', 'VeloTaxi', 2022, 'Verde', 'active', 'María López', '555-0102'),
  ('BT-003', 'EcoTaxi 300', 'GreenBike', 2020, 'Azul', 'maintenance', 'José Ramírez', '555-0103'),
  ('BT-004', 'CargoBike Pro', 'TaxiCycle', 2021, 'Rojo', 'active', 'Ana García', '555-0104'),
  ('BT-005', 'CityRunner Z', 'MetroCycle', 2023, 'Blanco', 'inactive', 'Pedro Torres', '555-0105')
ON CONFLICT (plate) DO NOTHING;
