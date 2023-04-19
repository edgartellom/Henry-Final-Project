const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const orderDetailRouter = require("./orderDetailRouter");
const reviewRouter = require("./reviewRouter");
const cartRouter = require("./cartRouter");
const cartDetailRouter = require("./cartDetailRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const userCartRouter = require("./userCartRouter")
// const checkoutRouter = require("./checkoutRouter");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/orderDetails", orderDetailRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/reviews", reviewRouter);
router.use("/carts", cartRouter);
router.use("/cartDetails", cartDetailRouter);
router.use('/userId/cart', userCartRouter);

// router.use("/checkout", checkoutRouter);
module.exports = router;
