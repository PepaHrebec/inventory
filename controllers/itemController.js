const Item = require("../models/item");

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
