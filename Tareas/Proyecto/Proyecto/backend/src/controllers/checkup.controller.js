const CheckupModel = require('../models/checkup.model');
const VehicleModel = require('../models/vehicle.model');

exports.getByVehicle = async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    const checkups = await CheckupModel.findByVehicle(req.params.vehicleId);
    res.json(checkups);
  } catch (err) {
    next(err);
  }
};

exports.getLatest = async (req, res, next) => {
  try {
    const checkups = await CheckupModel.findLatest(5);
    res.json(checkups);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { vehicle_id, brakes, lights, tires, frame, overall_status, notes } = req.body;
    if (!vehicle_id) return res.status(400).json({ message: 'vehicle_id is required' });

    const vehicle = await VehicleModel.findById(vehicle_id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const checkup = await CheckupModel.create({
      vehicle_id,
      inspector_id: req.user.id,
      brakes,
      lights,
      tires,
      frame,
      overall_status,
      notes,
    });
    res.status(201).json(checkup);
  } catch (err) {
    next(err);
  }
};
