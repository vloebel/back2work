const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const meetingRoutes = require('./meeting-routes.js');

router.use('/users', userRoutes);
router.use('/meeting', meetingRoutes);

module.exports = router;
