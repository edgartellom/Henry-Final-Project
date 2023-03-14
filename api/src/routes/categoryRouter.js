const { Router } = require("express");
const { getAllCategories } = require("../controllers/categoryController");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const allCategories = (await getAllCategories()).data;
    res.status(200).send(allCategories);
  } catch (error) {
    return { message: error.message };
  }
});

module.exports = router;
