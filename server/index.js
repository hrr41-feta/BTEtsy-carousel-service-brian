require('newrelic');
const express = require('express');
const app = express();
const port = 3003;
const parser = require('body-parser');
const models = require('../models/postgres/index.js');

app.use(express.static(__dirname + '/../../dist'));
app.use(parser.json());

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

app.post('/products', (req, res) => {
  models.saveProduct(req.body.productName, req.body.like, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
})

app.post('/products/:product_id/images', (req, res) => {
  models.saveImageByProductId(req.params.product_id, req.body.url, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
})

app.put('/products/:id', (req, res) => {
  models.updateProductById(req.params.id, req.body.like, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
})

app.delete('/products/:id', (req, res) => {
  models.deleteProductById(req.params.id, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`));