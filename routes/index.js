var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

// index page
router.get("/", category_controller.index);

// get category create form
router.get("/category/create", category_controller.category_create_get);

// receive category create form
router.post("/category/create", category_controller.category_create_post);

// get the form to delete a category
router.get("/category/:id/delete", category_controller.category_delete_get);

// delete a category
router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);

router.post("/category/:id/update", category_controller.category_update_post);

// get details of a category
router.get("/category/:id", category_controller.category_details);

// list of all categories
router.get("/categories", category_controller.categories_list);

///////////// ITEMS //////////////

// get the form to create an item
router.get("/item/create", item_controller.item_create_get);

// create an item
router.post("/item/create", item_controller.item_create_post);

// update item form get
router.get("/item/:id/update", item_controller.item_update_get);

// update item post
router.post("/item/:id/update", item_controller.item_update_post);

// get the form to delete an item
router.get("/item/:id/delete", item_controller.item_delete_get);

// delete an item
router.post("/item/:id/delete", item_controller.item_delete_post);

// get details of an item
router.get("/item/:id", item_controller.item_details);

// list of all items
router.get("/items", item_controller.items_list);

module.exports = router;
