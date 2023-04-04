const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item_name: { type: String, required: true, maxLength: 100 },
  item_description: { type: String, required: true, maxLength: 1000 },
  item_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  item_price: { type: Number, required: true },
  stock_number: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
