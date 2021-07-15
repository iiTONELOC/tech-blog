const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')
const dashboardRoutes = require('./dashboard-routes');
const bluetoothRoutes = require('./bt-routes');
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
<<<<<<< HEAD
=======
router.use('/bt', bluetoothRoutes);

>>>>>>> e42ccc7b3765825ba53e8fac4d782482cf185c02
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;