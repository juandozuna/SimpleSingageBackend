const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;

const screenScheme = new Scheme({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slides: [String],
    showControls: {
        type: Boolean,
        default: false
    },
    speed: {
        type: Number,
        default: 2500,//Default is 2.5s
        min: 1000, //Min is 1s
        max: 12000, //Max 12s
    }
}); 