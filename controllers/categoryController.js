const Category = require("../models/category");

exports.index = (req, res) => {
  res.render("index", {
    title: "Inventory app",
  });
};

exports.categories_list = (req, res, next) => {
  // Category.find().exec(function (err, list_categories) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.render("categories", {
  //     categories: list_categories,
  //   });
  // });
  Category.find({})
    .then((resolve) => {
      res.render("categories", {
        title: "List",
        categories: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.category_details = (req, res, next) => {
  Category.findById(req.params.id)
    .then((resolve) => {
      res.render("category_details", {
        title: "Category details",
        category: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};
