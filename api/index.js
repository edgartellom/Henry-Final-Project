require("dotenv").config();
const server = require("./src/app");
const { getAllCategories } = require("./src/controllers/categoryController");
const { getAllProducts } = require("./src/controllers/productController");
const { getAllUsers } = require("./src/controllers/userController");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(port, async () => {
    await getAllCategories();
    await getAllProducts();
    await getAllUsers();
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});


// [{ "price": 10,
// 	"name":"name",
// 	"quantity": 5,
// 	"cartId": "2ae7a201-b2a6-4850-92f5-203b8bc1b9ab",
// 	"productId": "8482717a-d032-42a4-9887-9ea7ec973eb6",
//  "image":"img",
// 	"userId":"123"
//  }]