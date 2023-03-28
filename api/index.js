require("dotenv").config();
const server = require("./src/app");
const { getAllCategories } = require("./src/controllers/categoryController");
const { getAllProducts } = require("./src/controllers/productController");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, async () => {
    await getAllCategories();
    await getAllProducts();
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});
