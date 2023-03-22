const { Router } = require("express");
const { Product, Order, Category, User } = require("../db");
const {
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { brand } = req.query;
    const allProducts = (await getAllProducts()).data;
    if (brand) {
      let productBrand = await allProducts.filter((el) =>
        el.brand.toLowerCase().includes(brand.toLowerCase())
      );
      productBrand.length
        ? res.status(200).send(productBrand)
        : res.status(404).send("BRAND NOT FOUND");
    } else {
      res.status(200).send(allProducts);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  //some errors trying to create
  try {
    let { brand, name, model, feature, detail, price, image, stock, category } =
      req.body;
    let createdProduct = await Product.create({
      brand,
      name,
      model,
      feature,
      detail,
      price,
      image,
    });
    let categoryDb = await Category.findAll({
      where: { name: category },
    });
    let newProduct = await createdProduct.addCategory(categoryDb);
    res.status(200).send(createdProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let allProducts = (await getAllProducts()).data;
    if (id) {
      let productId = await allProducts.filter((e) => e.id == id);
      productId.length
        ? res.status(200).send(productId)
        : res.status(404).send("Product not found!");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let allProducts = await getAllProducts();
    if (id) {
      let productId = await allProducts.filter((e) => e.id == id);
      await Product.destroy({
        where: { id: id },
      });
      productId.length
        ? res.status(200).send(productId)
        : res.status(404).send("Product not found!");
    }
    allProducts = allProducts.filter((e) => e.id != id);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    let { id, brand, name, model, price, image } = req.body;
    if (!brand || !name || !model || !price || !image) {
      return res.status(400).send({ error: "Missing info" });
    } else {
      let response = await updateProduct(req.body);
      response.status !== "error"
        ? res.send(response)
        : res.status(404).send(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;