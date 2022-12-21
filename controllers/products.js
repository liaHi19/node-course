const products = [];

const getAddProduct = (req, res) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  res.render("shop", { products, docTitle: "Shop", path: "/" });
};

module.exports = { getAddProduct, postAddProduct, getProducts };
