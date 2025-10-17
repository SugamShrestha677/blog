const express = require('express');
const {register, login, getAllUsers, deleteUser} = require('../controllers/authController')
const router = express.Router();


router.post('/',register);
router.post('/login',login);
router.get('/allUsers',getAllUsers);
router.delete("/user/:userId",deleteUser);

router.get('/',(req,res)=>{
    res.send("Register endpoint is active.")
})

module.exports = router;