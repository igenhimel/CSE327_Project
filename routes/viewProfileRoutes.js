const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>
{
    res.render('../views/pages/view_and_follow')
})

module.exports = router;