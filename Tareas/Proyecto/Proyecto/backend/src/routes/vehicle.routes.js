const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const ctrl = require('../controllers/vehicle.controller');

router.use(auth);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
