const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const productIndex = this.cart.items.findIndex(
      (prod) => prod.productId.toString() === this._id.toString()
    );
    let newQuantity = 1;
    const updatedItems = [...this.cart.items];
    if (productIndex >= 0) {
      newQuantity = this.cart.items[productIndex].quantity + 1;
      updatedItems[productIndex].quantity = newQuantity;
    } else {
      updatedItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
