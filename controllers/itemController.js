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
