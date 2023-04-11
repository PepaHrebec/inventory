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
  Category.find({})
    .then((resolve) => {
      res.render("item_form", {
        title: "Create item",
        categories: resolve,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.item_create_post = [
  body("item_name", "Item has to have a name.")
    .trim()
    .isLength({ min: 1, max: 100 }),
  body("item_description", "Item has to have a description.")
    .trim()
    .isLength({ min: 1, max: 1000 }),
  body("item_category", "Item has to have a selected category.")
    .trim()
    .escape(),
  body("item_price", "Item has to have a price greater than zero.")
    .trim()
    .escape(),
  body("stock_number", "Item has to have a decimal amount greater than 0.")
    .trim()
    .escape()
    .isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Category.find({}).then((resolve) => {
        res.render("item_form", {
          title: "Create item",
          categories: resolve,
        });
        return;
      });
    }
    const item = new Item({
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_category: req.body.item_category,
      item_price: req.body.item_price,
      stock_number: req.body.stock_number,
    });

    item
      .save()
      .then((itm) => {
        res.redirect(itm.url);
      })
      .catch((err) => {
        console.log("Here");
        return next(err);
      });
  },
];

exports.item_delete_get = (req, res, next) => {
  Item.findById(req.params.id)
    .then((resolve) => {
      res.render("item_delete", {
        title: "Delete item",
        deleted_item: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.item_delete_post = (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then((resolve) => {
      res.redirect("/items");
    })
    .catch((err) => {
      next(err);
    });
};

exports.item_update_get = (req, res, next) => {
  const itm = Item.findById(req.params.id).exec();
  const categs = Category.find({}).exec();

  Promise.all([itm, categs])
    .then((resolve) => {
      res.render("item_form", {
        title: "Update item",
        categories: resolve[1],
        item: resolve[0],
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.item_update_post = [
  body("item_name", "Item has to have a name.")
    .trim()
    .isLength({ min: 1, max: 100 }),
  body("item_description", "Item has to have a description.")
    .trim()
    .isLength({ min: 1, max: 1000 }),
  body("item_category", "Item has to have a selected category.")
    .trim()
    .escape(),
  body("item_price", "Item has to have a price greater than zero.")
    .trim()
    .escape(),
  body("stock_number", "Item has to have a decimal amount greater than 0.")
    .trim()
    .escape()
    .isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Category.find({}).then((resolve) => {
        res.render("item_form", {
          title: "Create item",
          categories: resolve,
        });
        return;
      });
    }
    const item = new Item({
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_category: req.body.item_category,
      item_price: req.body.item_price,
      stock_number: req.body.stock_number,
      _id: req.params.id,
    });
    Item.findByIdAndUpdate(req.params.id, item)
      .then((theItem) => {
        res.redirect(theItem.url);
      })
      .catch((err) => {
        next(err);
      });
  },
];
