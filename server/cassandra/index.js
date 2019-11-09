const express = require('express');
const app = express();
const port = 3002;
const parser = require('body-parser');

const models = require('../models/cassandra/index.js');

app.use(express.static(__dirname + '/../../public'));
app.use(parser.json());

app.get('/products/:productId', (req, res) => {
  models.getProductById(req.params.productId, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
})

app.put('/products/:productId', (req, res) => {
  models.updateProductById(parseInt(req.params.pruductId), req.body.liked, (err, result) => {
    if(err){
      console.log(typeof parseInt(req.params.productId), "id: ", req.params.productId, "body: ", req.body.liked);
      res.status(500).send(err);
    }
    else{
      console.log("success");
      res.send(result);
    }
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`));