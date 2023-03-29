const axios = require("axios");
const { Op } = require("sequelize");
const { Product, Category } = require("../db");
require("dotenv").config();
const API_URL = process.env.API_URL;

const getApiInfo = async () => {
  const products = (await axios(`${API_URL}/products`)).data;
  let orderedData = await products.sort((a, b) =>
    a.brand.localeCompare(b.brand)
  );
  const apiInfo = await orderedData.map((el) => ({
    // id: el.id,
    brand: el.brand,
    name: el.name,
    model: el.model,
    feature: el.feature,
    detail: el.detail,
    price: el.price,
    image: el.image.map((img) => img),
    category: el.category.map((cat) => cat.name),
  }));
  return apiInfo;
};

const getAllProducts = async () => {
  try {
    const apiInfo = await getApiInfo();
    let createdCount = 0;
    let foundCount = 0;
    let productPromises = await Promise.all(
      apiInfo.map(async (productData) => {
        const [product, created] = await Product.findOrCreate({
          where: {
            brand: productData.brand,
            name: productData.name,
            model: productData.model,
          },
          defaults: {
            feature: productData.feature,
            detail: productData.detail,
            price: productData.price,
            image: productData.image,
          },
          include: [Category],
        });
        if (created) {
          createdCount++;
        } else {
          foundCount++;
        }
        const category = await Category.findAll({
          where: { name: { [Op.in]: productData.category } },
        });
        if (category) {
          await product.addCategory(category);
        }
        return product;
      })
    );
    console.log(
      `${createdCount} products created, ${foundCount} products found in the database.`
    );
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name", "type"],
        through: {
          attributes: [],
        },
      },
    });
    return { data: products, status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateProduct = async (product) => {
  const {
    id,
    brand,
    name,
    model,
    feature,
    detail,
    price,
    image,
    category,
    stock,
    state,
  } = product;
  try {
    const productFromDb = await Product.findByPk(id);
    if (!productFromDb)
      return { message: "PRODUCT NOT FOUND", status: "error" };
    await productFromDb.update({
      brand,
      name,
      model,
      feature,
      detail,
      price,
      image,
      category,
      stock,
      state,
    });
    return { message: "Product updated succesfully", status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
};
