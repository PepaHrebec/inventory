const Item = require("../models/item");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.items_list = (req, res, next) => {
  Item.find({})
    .then((resolve) => {
      res.render("items", {
        title: "Items",
        items: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.item_details = (req, res, next) => {
  Item.findById(req.params.id)
    .populate("item_category")
    .then((resolve) => {
      res.render("item_details", {
        title: "Item details",
        item: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.item_create_get = (req, res, next) => {
  res.render("item_form");
};

exports.item_create_post = [
  body("item_name").trim().escape().isLength({ max: 100 }),
  body("item_description").trim().escape().isLength({ max: 1000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    }
  },
];
