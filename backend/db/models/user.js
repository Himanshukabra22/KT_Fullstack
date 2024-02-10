const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'room'
    }],
    devices: {
        type: [{
            deviceId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            allocated: {
                type: Boolean,
                default: false
            }
        }],
        default: []
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;