/**
 * API ROUTES --- SLIDES
 * 
 * TODO: This are the routes concerning the api of slides
 */

const express = require('express');
const router = express.Router() ;
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
    let update = {
        $set:{
            title: req.body.title,
            subtitle: req.body.subtitle,
            dispalyOrder: req.body.dispalyOrder,
            visible: req.body.visible,
            overlayHtml: req.body.overlayHtml,
            viewSchedule: req.body.viewSchedule
        }
    };
    Slide.updateSlide(id, update, (err, slide) => {
        if(err) res.json(err);
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
    Slide.addSlideToScreens(id, screens, (err, slide) => {
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
    Slide.removeSlideFromScreens(id, screens, (err, slide) => {
        if(err) res.send(err);
        res.json(slide);
    })
});

//Get all Slides in a given Screen
router.get('/screen/:screen', (req, res, next) => {
    Slide.getSlidesByScreen(req.params.screen, (err, slides) => {
        if(err) res.send(err);

        res.json(slides);
    });
});

//PROCESS TO DELETE A SLIDE
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    Slide.removeSlideById(id, (err, slide) => {
        if(err){
            res.send(err);
            return;
        }
        Screen.updateMany({slides: id}, {
            $pull: {
                slides: id
            }
        }, (err, raw) => {
            if(err){
                res.send(err);
                return;
            }
            res.send(slide);
        })
    })

});



module.exports = router;