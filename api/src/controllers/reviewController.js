const axios = require("axios");
const { Review, Product, User } = require("../db");

const getDbInfo = async (productId) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId,
        state: true,
      },
      include: [
        { model: Product, attributes: ["id"] },
        { model: User, attributes: ["id"] },
      ],
    });
    if (reviews.length > 0) {
      return { data: reviews, status: "success" };
    }
    return { message: "Reviews Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const createReview = async (review) => {
  const { productId, userId } = review;
  try {
    let product = await Product.findByPk(productId);
    let user = await User.findByPk(userId);
    if (product && user) {
      let reviewCreated = await Review.create({
        ...review,
        productId: product.id,
        userId: user.id,
      });
      return {
        reviewCreated,
        message: "Review created succesfully",
        status: "success",
      };
    } else {
      return { message: "Invalid Review", status: "error" };
    }
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateReview = async (review) => {
  const { id, rate, comment, state } = review;
  try {
    const reviewFromDb = await Review.findByPk(id);
    if (reviewFromDb) {
      reviewFromDb.update({
        rate,
        comment,
        state,
      });
      return { message: "Review updated succesfully", status: "success" };
    }
    return { message: "Review Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getDbInfo,
  createReview,
  updateReview,
};
