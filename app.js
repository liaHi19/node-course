const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./helpers/database");

const app = express();

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const { getNotFound } = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(getNotFound);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
