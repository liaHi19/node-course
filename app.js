const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./helpers/database");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getNotFound } = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
