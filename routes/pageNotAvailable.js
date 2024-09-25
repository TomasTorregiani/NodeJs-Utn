var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    console.log(`Pagina en reparacion`)
    next()
}, (req, res) => {
    res.render('pageAvailable')
})

module.exports = router;