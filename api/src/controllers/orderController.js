require("dotenv").config();
// const axios = require("axios");
const { Order, User, Cart } = require("../db");
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const Stripe = require("stripe");
const stripe = new Stripe(STRIPE_API_KEY);

const getDbInfo = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId,
        state: succeeded,
      },
      // include: [
      //   { model: User, attributes: ["id"] },
      //   { model: Cart, attributes: ["id"] },
      // ],
    });
    if (orders.length > 0) {
      return { data: orders, status: "success" };
    }
    return { message: "Orders Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const intentPayment = async (dataPayment) => {
  const { id_method, amount, description, payment_method, confirm } =
    dataPayment;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      payment_method: id_method,
      confirm: true,
    });
    // console.log(payment);
    return { message: "Succesfull payment" };
  } catch (error) {
    return { message: error.raw.message };
  }
};

const createOrder = async (order) => {
  const { userId, cartId } = order;
  try {
    let user = await User.findByPk(userId);
    let cart = await Cart.findByPk(cartId);
    if (user && cart) {
      let orderCreated = await Order.create({
        ...order,
        userId: user.id,
        cartId: cart.id,
        state: "succeeded",
      });
      return {
        orderCreated,
        message: "Order created succesfully",
        status: "success",
      };
    } else {
      return { message: "Invalid Order", status: "error" };
    }
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateOrder = async (order) => {
  const { id, toTalPrice, state } = order;
  try {
    const orderFromDb = await Order.findByPk(id);
    if (orderFromDb) {
      orderFromDb.update({
        toTalPrice,
        state,
      });
      return { message: "Order updated succesfully", status: "success" };
    }
    return { message: "Order Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getDbInfo,
  intentPayment,
  createOrder,
  updateOrder,
};
