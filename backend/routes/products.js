const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

router.options('/', cors());
router.options('/:id', cors());

/* GET all products. */
router.get('/', cors(), function(req, res, next) {
  try {
    fs.readFile(__dirname + '/../data/products.json', (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  } catch (error) {
    console.error(error);
  }
});
/* GET one product. */
router.get('/:id', cors(), function(req, res, next) {
  try {
    fs.readFile(__dirname + '/../data/products.json', 'utf8' , (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      const product = json.find(product => product.id === parseInt(req.params.id));
      res.send(product);
    });
  } catch (error) {
    console.error(error)
  }
});
/* POST one product. */
router.post('/', cors(), function(req, res, next) {
  fs.readFile(__dirname + '/../data/products.json', 'utf8' , (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    const newProduct = req.body.product;
    newProduct.id = json[json.length - 1].id + 1;
    json.push(newProduct);
    fs.writeFileSync(__dirname + '/../data/products.json', JSON.stringify(json, null, 2));
    res.send(newProduct);
  });
});
/* DELETE one product. */
router.delete('/:id', cors(), function(req, res, next) {
  try {
    let products = [];
    fs.readFile(__dirname + '/../data/products.json', 'utf8' , (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      products = json.filter(product => product.id !== parseInt(req.params.id));
      fs.writeFileSync(__dirname + '/../data/products.json', JSON.stringify(products, null, 2));
      res.send({response: `deleted product ${req.params.id}`});
    });
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
