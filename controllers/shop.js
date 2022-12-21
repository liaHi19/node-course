const { Product } = require("../models/Product");

const getProducts = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop/product-list", {
      products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};

const getIndex = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop/index", { products, docTitle: "Shop", path: "/" });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Your cart", path: "/cart" });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};

module.exports = { getProducts, getIndex, getCart, getCheckout };
