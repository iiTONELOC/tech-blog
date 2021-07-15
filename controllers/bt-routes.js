const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('bt-test')
});

module.exports = router;