const { Router, response } = require("express");
const {
  getDbInfo,
  createCart,
  updateCart,
} = require("../controllers/cartController");
// const { Cart } = require("../db");

const router = Router();

//GET CARTS BY USER ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await getDbInfo(id);
    response.status !== "error"
      ? res.send(response.data)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await createCart(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    let response = await updateCart(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
