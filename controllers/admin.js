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
  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => console.log("Created Product"))
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res) => {
  const { edit } = req.query;
  if (!edit) {
    res.redirect("/");
  }
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: edit,
      product,
    });
  });
};

const postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

const getProducts = (req, res, next) => {
  Product.findAll()
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
