const jwt = require('jsonwebtoken');
const userSchema = require('../models/User');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'upbc', async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            try {
                const user = await userSchema.findById(decoded.id);
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                req.user = user;
                next();
            } catch (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateJWT;
