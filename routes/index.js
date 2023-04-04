var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", category_controller.index);

router.get("/categories", category_controller.categories_list);

module.exports = router;
