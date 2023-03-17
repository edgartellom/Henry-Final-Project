const { Order_detail, Product, Order } = require("../db");

const getDbInfo = async (orderId) => {
  try {
    const orderDetails = Order_detail.findAll({
      where: {
        orderId,
        state: true,
      },
      include: [
        { model: Product, attributes: ["id"] },
        { model: Order, attributes: ["id"] },
      ],
    });
    if (orderDetails.length > 0) {
      return { data: orderDetails, status: "success" };
    }
    return { message: "Order Details Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const createDetail = async (details) => {
  // [{ price: ..., quantity: ..., orderId: ..., productId: ... }] => details;
  try {
    let isValid = true;
    for (let detail in details) {
      if (!detail.orderId || !detail.productId) isValid = false;
    }
    if (isValid) {
      let detailsCreated = await Order_detail.bulkCreate(details);
      return {
        detailsCreated,
        message: "Details created succesfully",
        status: "success",
      };
    } else {
      return { message: "Invalid Details", status: "error" };
    }
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateDetail = async (detail) => {
  const { id, price, quantity, state } = detail;
  try {
    const detailFromDb = await Order_detail.findByPk(id);
    if (detailFromDb) {
      detailFromDb.update({
        price,
        quantity,
        state,
      });
      return { message: "Detail updated succesfully", status: "success" };
    }
    return { message: "Order Detail Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getDbInfo,
  createDetail,
  updateDetail,
};
