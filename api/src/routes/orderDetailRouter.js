const { Router } = require("express");
const { Order_detail } = require("../db");
const {
  getDbInfo,
  updateDetail,
  createDetail,
} = require("../controllers/orderDetailController");

const router = Router();

//GET ORDER DETAILS BY ORDER ID
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
    let response = await createDetail(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    let response = await updateDetail(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
