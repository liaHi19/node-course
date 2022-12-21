const getNotFound = (req, res, next) => {
  res.render("404", { docTitle: "Page Not Found", path: "" });
};

module.exports = { getNotFound };
