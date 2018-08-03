const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');


//Init App
const app = express();

//Set Static Path for Express
app.use(express.static(path.join(__dirname, 'public')));

//Set Body Parser
app.use(bodyParser.json())
/*app.use(bodyParser.urlencoded({ extended: false }))*/

//Mongoose Setup -- Connect
mongoose.connect('mongodb://localhost:27017/SimpleSingage', {useNewUrlParser: true});
const db = mongoose.connection;

// Express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//routes
const slidesApi = require('./routes/slidesApi');
const screensApi = require('./routes/screensApi');



app.get('/', (req, res, next) => {
    let data = {
      message: "Hello the server is running"
    };
    res.json(data);
});

app.use('/api/slides', slidesApi);
app.use('/api/screens', screensApi);

app.listen(3000, (err) => {
  console.log('Server listening on port ' + 3000);
})

//module.exports = app;
