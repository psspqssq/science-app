const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post('/create-link', authenticateJWT, async (req, res) => {
    const { name, url, picture } = req.body;
    try {
        const newLink = new Link({ name, url, picture });
        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ message: 'Error creating link' });
    }
});

// Get all links
router.get('/links', authenticateJWT, async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
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
        res.status(500).json({ message: 'Error deleting link' });
    }
});

module.exports = router;
