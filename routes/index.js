var express = require('express');
var multer = require('multer')
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

router.post('/apk', (req, res, next) => {

  let app = req.app
  let upload = multer({ storage: app.locals.storage }).single('apk');

  app.locals.client.once('data', function(data, err) {
    res.render('index', { title: data });
  });

  upload(req, res, function(err){
    console.log(req.file.path)

    if(err)
      return res.send(err)

    let query = '{"path" :"' + req.file.path + '"}'
    console.log(query)
    app.locals.client.write(query);
  })
})

module.exports = router;
