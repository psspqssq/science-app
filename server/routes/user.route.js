const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/authenticateJWT'); // Import JWT middleware

// User Model
const userSchema = require('../models/User');

// Permissions map
const permissionsMap = {
    deletecontent: 'Delete Content',
    deleteusers: 'Delete Users',
    removepermissions: 'Remove Permissions',
    blockusers: 'Block Users',
    addpermissions: 'Add Permissions',
};

// CREATE User
router.post('/create-user', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = { ...req.body, password: hashedPassword };
        const result = await userSchema.create(newUser);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating user');
    }
});

// READ Users
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const results = await userSchema.find();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching users');
    }
});

// UPDATE user
router.get('/update-user/:id', authenticateJWT, async (req, res) => {
    try {
        const data = await userSchema.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating user');
    }
});

router.put('/update-user/:id', authenticateJWT, async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }
        const data = await userSchema.findByIdAndUpdate(req.params.id, { $set: rest }, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(data);
        console.log('User updated successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating user');
    }
});

// Delete User
router.delete('/delete-user/:id', authenticateJWT, async (req, res) => {
    try {
        const data = await userSchema.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting user');
    }
});

// Login User (public route)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
        const token = jwt.sign({ id: user._id, name: user.name }, 'upbc', { expiresIn: '1h' });
        console.log("Returning :" + { token: token, user: { id: user._id, name: user.name, permissions: user.permissions } });
        res.status(200).json({ token: token, user: { id: user._id, name: user.name, permissions: user.permissions } });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
});

// Verify token (protected route)
router.post('/verify-token', authenticateJWT, async (req, res) => {
    try {
        const user = await userSchema.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(200).json({ user: { id: user._id, name: user.name, permissions: user.permissions } });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
