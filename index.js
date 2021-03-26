const express = require('express');
const { v4: uuidv4,} = require('uuid');

const PORT = process.env.PORT || 5000

 express()
   .get('/robots/:size?', (req, res) => {
     if(!req.params.size) req.params.size = 25;

     let response = { response: []};
     for(let i=0; i<req.params.size; i++){
       let id = uuidv4();
        response.response.push({
          id: id,
          name: id.replace(/-/g, ' '),
          shortname: id.replace(/-.*/, ''),
          src: `https://robohash.org/${id}`,
          likes: 0
        });
     }
    
    res.send(response);
   })
   .get('/monsters/:size?', (req, res) => {
    if(!req.params.size) req.params.size = 25;

    let response = { response: []};
    for(let i=0; i<req.params.size; i++){
      let id = uuidv4();
       response.response.push({
         id: id,
         name: id.replace(/-/g, ' '),
         shortname: id.replace(/-.*/, ''),
         src: `https://robohash.org/${id}?set=set2`,
         likes: 0
       });
    }
   
   res.send(response);
  })
  .get('/kittens/:size?', (req, res) => {
    if(!req.params.size) req.params.size = 25;

    let response = { response: []};
    for(let i=0; i<req.params.size; i++){
      let id = uuidv4();
       response.response.push({
         id: id,
         name: id.replace(/-/g, ' '),
         shortname: id.replace(/-.*/, ''),
         src: `https://robohash.org/${id}?set=set4`,
         likes: 0
       });
    }
   
   res.send(response);
  })
  .get('/humans/:size?', (req, res) => {
    if(!req.params.size) req.params.size = 25;

    let response = { response: []};
    for(let i=0; i<req.params.size; i++){
      let id = uuidv4();
       response.response.push({
         id: id,
         name: id.replace(/-/g, ' '),
         shortname: id.replace(/-.*/, ''),
         src: `https://robohash.org/${id}?set=set5`,
         likes: 0
       });
    }
   
   res.send(response);
  })

  .get('/likes/:id?', (req, res) => {
   res.send({
     likes: Math.floor(Math.random()*2000 + 1)
   });
  })

   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
