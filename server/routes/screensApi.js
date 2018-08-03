/**
 * API ROUTES --- Screens
 * 
 * TODO: This are the routes concerning the api of screens
 */

const express = require('express');
const router = express.Router();

//Importing model
const Screen = require('../../models/screen.js');
const Slide = require('../../models/slide.js');

//GET -- All screens are returned
router.get('/', (req, res, next) => {
    Screen.getAllScreens((err, screens) => {
        if(err) res.send(err);
        res.json(screens);
    });
});

//GET -- Single Screen with it Slides
router.get('/single/:id', (req, res, next) => {
    let data = {
        screen: {

        },
        slides: []
    };
    Screen.getScreenById(req.params.id, (err, screen) => {
        if(err) res.send(err);
        Slide.getSlidesByScreen(req.params.id, (err, slides)=> {
            if(err) res.send(err);
            data.screen = screen;
            data.slides = slides;
            res.json(data);
        });
    });
});

//POST -- Data to new screen
router.post('/add', (req, res, next) => {
    let screen = new Screen({
        name: req.body.name.toLowerCase(),
        speed: req.body.speed || 2500,
        framework: req.body.framework,
        showControls: req.body.showControls || false
    });

    Screen.addScreen(screen, (err, screen) => {
        if(err){
            res.send(err);
            return;
        }
        screen.success = true;
        res.json(screen);
    })

})

//Get -- Get screen by its name
router.get('/:name', (req, res, next) => {
    Screen.getScreenByName(req.params.name, (err, screen) => {
        if(err){
            res.send(err);
            return;
        }
        res.json(screen);
    });
});

//PUT -- Modify properies of slider
router.put('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    let updated = {
        $set: {
            name: req.body.name,
            showControls: req.body.showControls,
            speed: req.body.speed,
            framework: req.body.framework
        }
    };
    Screen.update({_id: id}, update, (err, raw) => {
        if(err){
            res.send(err);
            return;
        }
        res.json(raw);
    });
});



//DELETE -- delete a screen from the database
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Screen.removeScreenById(id, (err,sraw) => {
        if(err){
            res.send(err);
            return;
        }
        Slide.updateMany({screens: id}, {
            $pull: {
                screens: id
            }
        }, (err, raw) => {
            if(err){
                res.send(err);
                return;
            }
            res.json({
                sc: sraw,
                sl: raw
            });
        })
    })
})






module.exports = router;