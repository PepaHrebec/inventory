const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");

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

exports.category_create_get = (req, res, next) => {
  res.render("category_form", {
    title: "Create category",
  });
};

exports.category_create_post = [
  body("category_name").trim().escape().isLength({ max: 100 }),
  body("category_description").trim().escape().isLength({ max: 1000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create category",
      });
      return;
    }
    const category = new Category({
      category_name: req.body.category_name,
      category_description: req.body.category_description,
    });

    // save return something when there's an error
    category
      .save()
      .then((categ) => {
        res.redirect(categ.url);
      })
      .catch((err) => {
        return next(err);
      });
  },
];

exports.category_delete_get = (req, res, next) => {
  Item.find({ item_category: req.params.id }).then((resolve) => {
    if (resolve.length === 0) {
      res.render("category_delete", {
        title: "Delete category",
        to_delete: undefined,
      });
    } else {
      res.render("category_delete", {
        title: "Delete category",
        to_delete: resolve,
      });
    }
  });
};
