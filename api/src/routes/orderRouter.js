const { Router } = require("express");
const {
  getDbInfo,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = Router();

//GET ORDERS BY USER ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await getDbInfo(id);
    console.log(response.status);
    res.send(response.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await createOrder(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    let response = await updateOrder(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
