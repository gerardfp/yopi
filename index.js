const express = require('express');
const { v4: uuidv4,} = require('uuid');

const PORT = process.env.PORT || 5000


// https://testimonialapi.toolcarton.com/api

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

   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
