var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send(`Aqui podras ver la lista de todos los productos`)
})

module.exports = router;