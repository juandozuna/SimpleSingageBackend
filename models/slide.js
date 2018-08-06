const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const slideSchema = new Schema({
    title: {type: String, required: true, unique: true},
    subtitle: String,
    displayOrder: Number,
    role: {
        type: String,
        default: 'image'
    },
    image: String,
    video: String,
    viewSchedule: [
        {
            day: {type: Number, min: 1, max: 7}, //Takes number between 1 and 7 to represent each of the weekdays.
            active: {type: Boolean, default: true},
            from: {type: Number, min: 0, max: 1440, default: 0}, //Max -- Amount of minutes in a 24hour day
            to: {type: Number, min: 0, max: 1440, default: 1440},
        },
    ],
    screens: [String],
    visible: {type: Boolean, default: true},
    overlayHtml: String
});

slideSchema.plugin(AutoIncrement, {inc_field: 'displayOrder'});

const Slide = module.exports = mongoose.model('Slide', slideSchema);

module.exports.getAllSlides = function(callback){
    Slide.find({}, callback).sort([['displayOrder', 'ascending']]);
}

module.exports.getSlidesByScreen = function(screen, callback){
    Slide.find({screens: screen}, callback);
}

module.exports.addSlide = function(slide, callback){
    Slide.create(slide, callback);
}

module.exports.getSlideById = function(id, callback){
    Slide.findById(id, callback);
}

//Overload 2 - Takes options
module.exports.updateSlide = function(id, update, callback)
{
    Slide.update({_id: id}, update, callback);
}



module.exports.addSlideToScreens = function(id, screens, callback){
    
    Slide.update({_id: id}, {
        $addToSet: {
            screens: screens
        }
    }, callback)
}


module.exports.removeSlideFromScreens = function(id, screens, callback)
{
    Slide.update({_id: id}, {
        $pull: {
            screens: {
                $in: screens
            }
        }
    }, callback);
}

module.exports.removeSlideById = function(id, callback){
    Slide.remove({_id: id}, callback);
}


