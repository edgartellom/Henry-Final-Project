require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

let sequelize;
DB_DEPLOY
  ? (sequelize = new Sequelize(DB_DEPLOY, {
      logging: false,
      native: false,
    }))
  : (sequelize = new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bestify-pc`,
      {
        logging: false,
        native: false,
      }
    ));

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Category,
  Order,
  Order_detail,
  User,
  Product,
  Cart,
  Cart_detail,
  Review,
  Address
} = sequelize.models; //extraer datos y asignarlos como variables

//Product_relations
const Product_Category = sequelize.define(
  "product_category",
  {},
  { timestamps: false, freezeTableName: true }
);
Product.belongsToMany(Category, { through: Product_Category });
Category.belongsToMany(Product, { through: Product_Category });

//Review_relations
Product.hasMany(Review);
Review.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Review);
Review.belongsTo(User, { foreignKey: "userId" });

//Cart_Detail_relations
Product.hasMany(Cart_detail);
Cart_detail.belongsTo(Product, { foreignKey: "productId" });

Cart.hasMany(Cart_detail);
Cart_detail.belongsTo(Cart, { foreignKey: "cartId" });

//Cart_relations
User.hasMany(Cart);
Cart.belongsTo(User, { foreignKey: "userId" });

//Order_relations
User.hasMany(Order);
Order.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(Order);
Order.belongsTo(Cart, { foreignKey: "cartId" });

//Order_Detail_relations
Product.hasMany(Order_detail);
Order_detail.belongsTo(Product, { foreignKey: "productId" });

Order.hasMany(Order_detail);
Order_detail.belongsTo(Order, { foreignKey: "orderId" });

User.hasMany(Address)
Address.belongsTo(User,{foreignKey:"userId"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
