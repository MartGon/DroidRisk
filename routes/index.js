var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  let app = req.app

  console.log("Set callback")
  app.locals.client.once('data', function(data, err) {
    console.log('Received: ' + data);
    res.render('index', { title: data });
  });
  console.log("Writing request")
  app.locals.client.write('{"path" :"/home/defu/Documents/TFM/Projects/MalwareClassifier/Datasets/koodous/samples/0abec397b08fb879.apk"}');
});

module.exports = router;
