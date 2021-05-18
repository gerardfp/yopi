const express = require('express');
const { v4: uuidv4,} = require('uuid');
const multer = require('multer')

const PORT = process.env.PORT || 5000


// https://testimonialapi.toolcarton.com/api

storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    return crypto2.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});





function template(strings, ...keys) {
  return (function(...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function(key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

const genId = (size, src) => {
  let response = { response: []};
  size = size ? size : 25;
  for(let i=0; i<size; i++){
    let id = uuidv4();
     response.response.push({
       id: id,
       name: id.replace(/-/g, ' '),
       shortname: id.replace(/-.*/, ''),
       src: src({id: id}),
       likes: 0
     });
  }
  return response;
}

express()
  .get('/robots/:size?', (req, res) => {
    res.send(genId(req.params.size, template`https://robohash.org/${'id'}`));
  })
  .get('/monsters/:size?', (req, res) => {
    res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set2`));
  })
  .get('/kittens/:size?', (req, res) => {
    res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set4`));
  })
  .get('/humans/:size?', (req, res) => {
    res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set5`));
  })

  .get('/likes/:id?', (req, res) => {
   res.send({ likes: Math.floor(Math.random()*2000 + 1)});
  })

  .post("/upload", multer({storage: storage}).single('avatar'), function(req, res) {
      // res.redirect("/uploads/" + req.file.filename);
      console.log(req.file.filename);
      return res.status(200).end();
    })
    
    .get('/uploads/:upload', function (req, res){
      file = req.params.upload;
      console.log(req.params.upload);
      var img = fs.readFileSync(__dirname + "/uploads/" + file);
      res.writeHead(200, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    })

   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
