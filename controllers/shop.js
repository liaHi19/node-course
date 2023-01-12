const { Product } = require("../models/Product");
const Cart = require("../models/Cart");

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
    res.render("shop/product-detail", {
      product,
      docTitle: "Detail Page",
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
  Cart.getCart((cart) => {
    Product.getAllProducts((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        docTitle: "Your cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/");
};

const postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
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
  postCart,
  getCheckout,
  getOrders,
  postCartDeleteProduct,
};
