const express = require('express');
const {check, oneOf} = require('express-validator');
const router = express.Router();
// const fileUpload = require('../middleware/file-upload')

const userControllers = require('../controllers/users');

// router.get('/', userControllers.getUsers);
router.post('/signup', 
        [
            check('firstName').not().isEmpty(),
            check('lastName').not().isEmpty(),
            check('mobile').isLength({min: 10, max: 10}),
            check('email').isEmail(),
            check('password').isLength({min: 8})
        ],userControllers.signup);
router.post('/login', oneOf([
    [check('mobile').isLength({min: 10, max: 10}), check('password').isLength({min: 8})],
    [ check('email').isEmail(), check('password').isLength({min: 8})]
]),userControllers.login);

module.exports = router;