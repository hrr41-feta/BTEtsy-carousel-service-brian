const express = require('express');
const app = express();
const port = 3003;
const parser = require('body-parser');
const models = require('../models/postgres/index.js');

app.use(express.static(__dirname + '/../../public'));

app.get('/products/:id', (req, res) => {
  models.getProductById(req.params.id, (err, result) => {
    if(err){
      console.log("error");
      res.status(500).send(err);
    }
    else{
      console.log("success");
      res.send(result);
    }
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`));