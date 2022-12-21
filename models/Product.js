const fs = require("fs");
const path = require("path");

const rootDir = require("../helpers/path");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    let products;
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    (this.imageUrl = imageUrl),
      (this.price = price),
      (this.description = description);
  }
  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static getAllProducts(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
}

module.exports = { Product };
