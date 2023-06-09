const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");

exports.index = (req, res) => {
  res.render("index", {
    title: "Inventory app",
  });
};

exports.categories_list = (req, res, next) => {
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
  const itm = Item.find({ item_category: req.params.id }).exec();
  const cat = Category.findById(req.params.id).exec();

  Promise.all([itm, cat])
    .then((resolve) => {
      if (resolve[0].length === 0) {
        res.render("category_delete", {
          title: "Delete category",
          to_delete: undefined,
          cat: resolve[1],
        });
      } else {
        res.render("category_delete", {
          title: "Delete category",
          to_delete: resolve[0],
          cat: resolve[1],
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.category_delete_post = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then((resolve) => {
      res.redirect("/categories");
    })
    .catch((err) => {
      next(err);
    });
};

exports.category_update_get = (req, res, next) => {
  Category.findById(req.params.id)
    .then((resolve) => {
      res.render("category_form", {
        title: "Category update",
        category: resolve,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.category_update_post = [
  body("category_name").trim().escape().isLength({ max: 100 }),
  body("category_description").trim().escape().isLength({ max: 1000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Category update",
        category: req.body,
      });
    }
    const category = new Category({
      category_name: req.body.category_name,
      category_description: req.body.category_description,
      _id: req.params.id,
    });

    Category.findByIdAndUpdate(req.params.id, category)
      .then((theCategory) => {
        res.redirect(theCategory.url);
      })
      .catch((err) => {
        next(err);
      });
  },
];
