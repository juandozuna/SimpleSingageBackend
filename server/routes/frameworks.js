const express = require('express');
const router = express.Router();

const Framework = require('../../models/frameworks');
const Screen = require('../../models/screen');


//Get all frameworks
router.get('/', (req, res, next) => {
  Framework.find({}, (err, frs) => {
    if(err){
      res.send(err);
      return;
    }
    res.json(frs);
  });
});

//Get frameworks with screens
router.get('/screens', (req, res, next) => {
  Screen.getAllScreens((err, screens) => {
    if(err){
      res.send(err);
      return;
    }
    Framework.find({}, (err, frs) => {
      if(err){
        res.send(err);
        return;
      }
      res.json({
        screens: screens,
        frameworks: frs
      }); 
    })
  })
})

//Add Framework
router.post('/', (req, res, next) => {
  const framework = new Framework({
    title: req.body.title,
    disabled: req.body.disabled
  });
  Framework.create(framework, (err, fr) => {
    if(err) {
      res.send(err);
      return;
    }
    res.json(fr);
  });
});


//Delete Framework
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Framework.deleteOne({_id: id}, (err, raw) => {
    if(err){
      res.send(err);
      return;
    }
    res.json(raw);
  });
});






module.exports = router;