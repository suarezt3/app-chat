const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('El servidor esta corriendo correctamente')
});

module.exports = router;