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

const getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    console.log(product);
  });
  res.redirect("/");
};

const getIndex = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop/index", { products, docTitle: "Shop", path: "/" });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Your cart", path: "/cart" });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Your orders", path: "/orders" });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};

module.exports = {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
};
