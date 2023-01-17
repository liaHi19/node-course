const Product = require("../models/Product");
const Cart = require("../models/Cart");

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findAll({ where: { id: productId } })
    .then((products) => {
      res.render("shop/product-detail", {
        product: products[0],
        docTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", { products, docTitle: "Shop", path: "/" });
    })
    .catch((err) => console.log(err));
};

const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) =>
        res.render("shop/cart", {
          docTitle: "Your cart",
          path: "/cart",
          products,
        })
      );
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  const { productId } = req.body;

  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

const postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      return products[0].cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

const getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "Your orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

const postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => res.redirect("/orders"))
    .catch((err) => {
      console.log(err);
    });
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
  postOrder,
};
