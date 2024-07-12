const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const authenticateJWT = require('../middleware/authenticateJWT');

// Create a new link
router.post('/create-link', authenticateJWT, async (req, res) => {
    const { name, url, picture, accessLevel, category } = req.body;
    try {
        const newLink = new Link({ name, url, picture, accessLevel, category });
        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        console.error('Error creating link:', error);
        res.status(500).json({ message: 'Error creating link' });
    }
});

// Get all links
router.get('/links', authenticateJWT, async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ message: 'Error fetching links' });
    }
});

// Delete a link
router.delete('/links/:id', authenticateJWT, async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({ message: 'Error deleting link' });
    }
});

// Update access level of a link
router.patch('/links/:id/accesslevel', authenticateJWT, async (req, res) => {
    const { accessLevel } = req.body;
    try {
        const updatedLink = await Link.findByIdAndUpdate(req.params.id, { accessLevel }, { new: true });
        if (!updatedLink) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json(updatedLink);
    } catch (error) {
        console.error('Error updating access level:', error);
        res.status(500).json({ message: 'Error updating access level' });
    }
});

module.exports = router;
