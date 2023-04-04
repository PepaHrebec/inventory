#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name, description) {
  const category = new Category({
    category_name: name,
    category_description: description,
  });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function itemCreate(name, description, category, price, number) {
  const item = new Item({
    item_name: name,
    item_description: description,
    item_category: category,
    item_price: price,
    stock_number: number,
  });
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      "Arabica",
      "Known for their smooth, complex flavor and distinct lack of bitterness."
    ),
    categoryCreate(
      "Robusta",
      "Often has a strong smell and a somewhat flat, almost burnt taste. Robusta beans also have significantly more caffeine than Arabica beans."
    ),
    categoryCreate(
      "Liberica",
      "Unusual, nutty, woody flavor and sneaky backbite on the finish."
    ),
    categoryCreate(
      "Excelsa",
      "Combine light roast traits like tart notes and fruity flavors with flavors that are more reminiscent of dark roasts."
    ),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      "Lyons go-Joe",
      "Aroma was somewhat overpowering and slightly Marmitey, but the taste made up for it with its smooth, caramel aftertaste. Our favourite blend was Go-Joe and would be a great group-pleaser to take along in a flask to a picnic.",
      categories[0],
      5.99,
      22
    ),
    itemCreate(
      "Colombia Eje Cafetero",
      "Naše bezkofeinová káva tentokrát pochází z produkce několika farmářů z oblasti Eje Cafetero v departementu Quindio v centrální Kolumbii. Jedná se o blend několika místních odrůd s největším zastoupením odrůd Caturra a Castillo.",
      categories[1],
      11.99,
      13
    ),
    itemCreate(
      "The Underdog",
      "Už jenom výběrem zrn zde jdeme záměrně vstříc spíš nižší kyselosti, mohutnějšímu tělu a plné sladkosti s možná silnější hořkostí, než jsi u nás zvyklý. Tohle kafe podle nás nikoho neurazí, navíc skvěle funguje i na automatických kávovarech, takže se parádně hodí třeba do kanceláře.",
      categories[2],
      8.99,
      5
    ),
    itemCreate(
      "Rwanda – Horizon Natural",
      "Red Bourbon je vysoká odrůda kávovníku, která se vyznačuje relativně nízkou produkcí a náchylností na choroby a škůdce, ale vynikající kvalitou a chutí. Bourbon byl z Jemenu přenesen do Brazílie kolem roku 1860 a odtud se rychle rozšířil na sever do dalších částí Jižní a Střední Ameriky, kde se pěstuje dodnes.",
      categories[1],
      13.99,
      12
    ),
    itemCreate(
      "Mother-Ship Blend",
      "Plné krémové tělo, mléčná čokoláda a květinové aroma. To vše můžete najít v šálku našeho espresso blendu Mother Ship. Bude radost s ním pracovat jak v kavárně, tak u vás doma: je totiž skvělým základem pro vaše mléčné nápoje, ale zároveň nezklame žádného fanouška čistého espressa.",
      categories[3],
      2.99,
      29
    ),
    itemCreate(
      "Etiopie – Kabira Washed",
      "Tato káva je ideální na přípravu typického etiopského espressa, které je lehké, čajové s vůní květin. Acidita je jemnější, v kávě převládají sladké chutě a hutnější medové tělo.",
      categories[2],
      4.99,
      40
    ),
    itemCreate(
      "Jenny's Barrel Coffee",
      "Káva s chutí alkoholu, to je parádní kombinace. A proto jsme se nadšeně vrhli do společného projektu s Kofiem. Baví nás zkoušet a vymýšlet nové věci, a barelová káva pro nás byla velkou neznámou, ale zároveň nás ohromně zajímalo, jak na kávu uloženou v sudech.",
      categories[1],
      30.99,
      3
    ),
  ]);
}
