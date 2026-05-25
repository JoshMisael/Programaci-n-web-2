const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const ctrl = require('../controllers/checkup.controller');

router.use(auth);

router.get('/latest', ctrl.getLatest);
router.get('/vehicle/:vehicleId', ctrl.getByVehicle);
router.post('/', ctrl.create);

module.exports = router;
