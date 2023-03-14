const axios = require("axios");
const { Category } = require("../db");
require("dotenv").config();
const API_URL = process.env.API_URL;

const getAllCategories = async () => {
  try {
    let allCategories = (await axios(`${API_URL}/categories`)).data;
    allCategories = allCategories.map((el) => el.name);
    let createdCount = 0;
    let foundCount = 0;
    let categoryPromises = await Promise.all(
      allCategories.map(async (cat) => {
        const [category, created] = await Category.findOrCreate({
          where: { name: cat },
        });
        if (created) {
          createdCount++;
        } else {
          foundCount++;
        }
        return category;
      })
    );
    console.log(
      `${createdCount} categories created, ${foundCount} categories found in the database.`
    );
    const categories = await Category.findAll();
    return { data: categories, status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getAllCategories,
};
