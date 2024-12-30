const express = require('express');
const { verifyJWT } = require('../middlewares/authMiddleware');
const { createForm, getFormsByUserId, getFormById, submitForm } = require('../controllers/formController');

const router = express.Router();


router.post('/create', verifyJWT, createForm);
router.get('/:formId', verifyJWT, getFormById);

router.get('/user/:userId', verifyJWT, getFormsByUserId);

router.post("/:formId/submit", verifyJWT, submitForm);

module.exports = router;