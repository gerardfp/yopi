const express = require('express');
var uuid = require("uuid");

const PORT = process.env.PORT || 5000

 express()
   .get('/:size?', (req, res) => {
     if(!req.params.size) req.params.size = 25;

     let response = { response: []};
     for(let i=0; i<req.params.size; i++){
       let id = uuid();
        response.response.push({
          name: id,
          src: 'https://robohash.org/{$id}'
        });
     }
    
    res.send('hola')
   })
   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
