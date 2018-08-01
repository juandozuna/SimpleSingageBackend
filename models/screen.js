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
    },
    framework: {
        type: String,
        default: 'reaveljs'
    }
}); 

const Screen = module.exports = mongoose.model('Screen', screenScheme);

module.exports.getAllScreens = function(callback){
    Screen.find({}, callback);
}

module.exports.getScreenById = function(id, callback){
    Screen.findById(id, callback);
}

module.exports.getScreenByName = function(name, callback){
    let query = {
        name: name
    };
    Screen.findOne(query, callback);
}

module.exports.addScreen = function(screen, callback){
    Screen.create(screen, callback);
}

module.exports.removeSlidesFromScreen = function(id, slides, callback){
    Screen.findByIdAndUpdate(id, {
        $pull: {
            slides: {
                $in: slides
            }
        }
    },callback);
}

module.exports.removeScreenById = function(id, callback){
    Screen.findByIdAndRemove(id, callback);
}