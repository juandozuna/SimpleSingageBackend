/**
 * API ROUTES --- SLIDES
 * 
 * TODO: This are the routes concerning the api of slides
 */

const express = require('express');
const router = express.Router;
const {check, validationResult} = require('express-validator/check');
//Importing model
const Screen = require('../../models/screen.js');
const Slide = require('../../models/slide.js');

//Get all slides
router.get('/', (req, res, next) => {
    Slide.getAllSlides((err, slides) => {
        if(err) res.send(err);
        res.json(slides);
    });
});

//Post - Add a Slide
router.post('/add',(req, res, next) => {
    let s = new Slide({
        title: req.body.title,
        subtitle: req.body.subtitle,
        role: req.body.role || 'image',
        image: req.body.image,
        video: req.body.video,
        viewSchedule: req.body.viewSchedule,
        visible: true,
        overlayHtml: req.body.overlayHtml
    });
    Slide.addSlide(s, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    })
});

//Get a Slide By the ID
router.get('/single/:id', (req, res, next) => {
    const id = req.params.id;
    Slide.getSlideById(id, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    });
});

//PUT req -- Update Info in Slide
router.put('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const update = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        dispalyOrder: req.body.dispalyOrder,
        role: req.body.role,
        image: req.body.image,
        video: req.body.video,
        viewSchedule: req.body.viewSchedule,
        visible: req.body.visible,
        overlayHtml: req.body.overlayHtml
    };
    Slide.updateSlide(id, update, {new: true}, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    });
});

//POST - Add a Slide to Screens
router.post('/screen/addslide/:id', (req, res, next) => {
    const id = req.params.id;
    const screens = req.body.screens;
    Screen.addSlideToScreens({
        _id: {
            $in: screens
        }
    }, id);
    Slide.addSlideToSreens(id, screens, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    })
});

//POST - Remove slide from Screens
router.post('/screen/removeslide/:id', (req, res, next) => {
    const id = req.params.id; //Slide id
    const screens = req.body.screens;
    let query = {
        _id: {
            $in: screens
        }
    };
    Screen.removeSlideFromScreens(query, id);
    Slide.removeSlideFromScreen(id, screens, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    })
});

//Get all Slides in a given Screen
router.get('/screen/:screen', (req, res, next) => {
    const screenId = req.params.screenId;
    Slide.getSlidesByScreen(screenId, (err, slides) => {
        if(err) res.send(err);
        res.json(slides);
    });
});







module.exports = router;