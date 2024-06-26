const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');
const jwt = require('jsonwebtoken');
const userRoute = require('./routes/user.route');
const linkRoute = require('./routes/links.route');
const authenticateJWT = require('./middleware/authenticateJWT');

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbConfig.db, mongooseOptions)
    .then(() => {
        console.log('Connected to the database successfully!')
    })
    .catch(error => {
        console.log('Database connection error: ' + error)
    });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Public routes
app.use('/', userRoute);

// Protected routes
app.use('/api', authenticateJWT, linkRoute);
app.use('/users', authenticateJWT, userRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port: ' + port)
});

// 404 Error
app.use((req, res, next) => {
    res.status(404).send('Error 404!')
});

app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
