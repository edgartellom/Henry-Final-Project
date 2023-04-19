/* onst { Order} = require('../models'); */
const { User, Order, OrderList } = require("../db");

const addToCart = async (req, res) => {
    const { productId, price, quantity } = req.body.product;
    const { userId } = req.params;

    if (!userId) {
        return res.status(200).json('Ingresa un usuario');
    }

    try {
        let order = await Order.findOne({ where: { userId: userId, status: 'carrito' } });
        if (!order) {
            order = await Order.create({ status: 'carrito' });
        }
        await order.setUser(userId);

        if (productId) {
            await OrderList.create({
                price,
                quantity,
                orderId: order.id,
                productId: productId
            });
        }
        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = { addToCart };