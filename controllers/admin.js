const Product = require("../models/Product");

const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
    })
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res) => {
  const { edit } = req.query;
  if (!edit) {
    res.redirect("/");
  }
  const { productId } = req.params;
  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: edit,
        product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      (product.title = title),
        (product.imageUrl = imageUrl),
        (product.price = price),
        (product.description = description);
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Deleted product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  getProducts,
  postEditProduct,
  postDeleteProduct,
};
