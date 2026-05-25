const VehicleModel = require('../models/vehicle.model');

exports.getAll = async (req, res, next) => {
  try {
    const vehicles = await VehicleModel.findAll();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { plate, model, brand, year, color, status, owner_name, owner_phone } = req.body;
    if (!plate) return res.status(400).json({ message: 'plate is required' });
    const vehicle = await VehicleModel.create({ plate, model, brand, year, color, status, owner_name, owner_phone });
    res.status(201).json(vehicle);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Plate already exists' });
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    const updated = await VehicleModel.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Plate already exists' });
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.remove(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted', vehicle });
  } catch (err) {
    next(err);
  }
};
