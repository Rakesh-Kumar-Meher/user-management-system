const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Get all users (Admin only)
router.get('/', auth, roleCheck(['admin']), userController.getAllUsers);

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update profile
router.put('/profile', auth, [
  body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please enter a valid email')
], userController.updateProfile);

// Change password
router.put('/password', auth, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number')
], userController.changePassword);

// Activate user (Admin only)
router.patch('/:id/activate', auth, roleCheck(['admin']), userController.activateUser);

// Deactivate user (Admin only)
router.patch('/:id/deactivate', auth, roleCheck(['admin']), userController.deactivateUser);

module.exports = router;
