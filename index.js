const express = require('express');
const { v4: uuidv4,} = require('uuid');
const multer = require('multer');
const promise = require('bluebird');
const db = require('pg-promise')({ promiseLib: promise })({ connectionString: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false });

const PORT = process.env.PORT || 5000

db.none("CREATE TABLE IF NOT EXISTS files (name TEXT, data BYTEA)");


express()

  .post("/upload", multer({storage: multer.memoryStorage()}).single('avatar'), async function(req, res) {
      const imgName = uuidv4();
      db.none("INSERT INTO files(name, data) VALUES($1, $2)", [imgName, req.file.buffer]);
      res.send({ imgUrl: 'uploads/' + imgName });
  })
    
  .get('/uploads/:upload', async function (req, res){
    const data = await db.any("SELECT data FROM files WHERE name = ${name}", { name: req.params.upload });
    const img = Buffer.from(data[0].data, 'binary');

    res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': img.length });
    res.end(img);
  })

  .get('/', async function(req, res){
    const files = await db.any("SELECT name FROM files");

    let output = '<div style="display: flex">';
    for(let file of files) {
      output += `<img src="uploads/${file.name}>`;
    }
    output += "</div>";

    res.send(output);
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))







// https://testimonialapi.toolcarton.com/api

// .get('/robots/:size?', (req, res) => { res.send(genId(req.params.size, template`https://robohash.org/${'id'}`));})
// .get('/monsters/:size?', (req, res) => { res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set2`));})
// .get('/kittens/:size?', (req, res) => { res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set4`));})
// .get('/humans/:size?', (req, res) => { res.send(genId(req.params.size, template`https://robohash.org/${'id'}?set=set5`));})
// .get('/likes/:id?', (req, res) => { res.send({ likes: Math.floor(Math.random()*2000 + 1)});})

// function template(strings, ...keys) {
//   return (function(...values) {
//     let dict = values[values.length - 1] || {};
//     let result = [strings[0]];
//     keys.forEach(function(key, i) {
//       let value = Number.isInteger(key) ? values[key] : dict[key];
//       result.push(value, strings[i + 1]);
//     });
//     return result.join('');
//   });
// }

// const genId = (size, src) => {
//   let response = { response: []};
//   size = size ? size : 25;
//   for(let i=0; i<size; i++){
//     let id = uuidv4();
//     response.response.push({ id: id, name: id.replace(/-/g, ' '), shortname: id.replace(/-.*/, ''), src: src({id: id}), likes: 0 });
//   }
//   return response;
// }
