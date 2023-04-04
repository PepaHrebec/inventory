var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// index page
router.get("/", category_controller.index);

// get details of a category
router.get("/category/:id", category_controller.category_details);

// list of all categories
router.get("/categories", category_controller.categories_list);

// get details of an item
router.get("/item/:id", item_controller.item_details);

// list of all items
router.get("/items", item_controller.items_list);

module.exports = router;
