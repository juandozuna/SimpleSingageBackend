const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slides: [{
        type: String,
        unique: true
    }],
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

const Screen = module.exports = mongoose.model('Screen', screenSchema);

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

module.exports.removeSlideFromScreen = function(id, slide, callback){
    Screen.findByIdAndUpdate(id, {
        $pull: {
            slides: {
                $in: [slide]
            }
        }
    },callback);
}

module.exports.removeSlideFromScreens = function(query, slide){
    Screen.updateMany(query, {
        $pull: {
            slides: slide
        }
    }).exec();
}

module.exports.addSlideToScreen = function(id, slide, callback){
    Screen.findByIdAndUpdate(id, {
        $push: {
            slides: {
                $each: [slide]
            }
        }
    }, callback);
}

module.exports.addSlidesToScreen = function(id, slides, callback){
    Screen.findByIdAndUpdate(id, {
        $push: {
            slides: {
                $each: slides
            }
        }
    }, callback);
}

module.exports.addSlideToScreens = function(query, slide){
    Screen.updateMany(query, {
        $push: {
            slides: slide
        }
    }).exec();
}


module.exports.removeScreenById = function(id, callback){
    Screen.remove({_id: id}, callback);
}