const db = require("../helpers/database");

const Cart = require("./Cart");

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    (this.imageUrl = imageUrl),
      (this.price = price),
      (this.description = description);
  }
  save() {
    return db.execute(
      "INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)",
      [this.title, this.imageUrl, this.price, this.description]
    );
  }

  static deleteById(id) {}

  static getAllProducts() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
}

module.exports = { Product };
