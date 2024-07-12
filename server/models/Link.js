const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    accessLevel: {
        type: Number,
        required: true,
        enum: [1, 2, 3] // Define access levels as 1, 2, or 3
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Link', LinkSchema);
