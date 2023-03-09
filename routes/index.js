const router = require('express').Router();
const apiRoutes = require('./api');

// Middleware that logs requests to the console
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

router.use('/api', apiRoutes);

module.exports = router;
