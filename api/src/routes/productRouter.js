const { Router } = require("express");
const { Product, Order, Category, User } = require("../db");
const {
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");

const router = Router();

router.get("/", async (req, res) => {
if (req.query._sort ){
  const page = parseInt(req.query._start) || 1;
  const limit = parseInt(req.query._end) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(startIndex, endIndex)
}


  try {
    const { brand } = req.query;
    const allProducts = (await getAllProducts()).data;
    if (brand) {
      let productBrand = await allProducts.filter((el) =>
        el.brand.toLowerCase().includes(brand.toLowerCase())
      );

      if (page && limit) {
        const results = {};

        if (endIndex < productBrand.length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }
        results.results = productBrand.slice(startIndex, endIndex);
        res.status(200).send(results);
      } else {
        productBrand.length
          ?

          res.status(200).send(productBrand)
          : res.status(404).send("BRAND NOT FOUND");
      }

    } else {

      res.status(200).send(allProducts);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  console.log("creating");
  //some errors trying to create
  try {
    let { brand, name, model, feature, detail, price, image, stock, category } =
      req.body;
    console.log(brand + name);

    let createdProduct = await Product.create({
      brand,
      name,
      model,
      feature,
      detail,
      price,
      image,
    });
    let categories = category.map((el) => el.name);
    console.log(categories);
    let categoryDb = await Category.findAll({
      where: {
        name: categories,
      },
    });
    if (categoryDb.length === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    if (!name) return res.status(404).json({ error: "insert a name" });
    createdProduct.addCategory(categoryDb);
    res.status(200).send(createdProduct);
    console.log(createdProduct, "createdProduct");
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error.message });
  }
});

// router.post("/", async (req, res) => {
//   console.log("creating")
//   //some errors trying to create
//   try {
//     let { brand, name, model, feature, detail, price, image, stock, category } =
//       req.body;
//     console.log(brand + name + category)
//     let createdProduct = await Product.create({
//       brand,
//       name,
//       model,
//       feature,
//       detail,
//       price,
//       image,
//     });
//     let categoryDb = await Category.findAll({
//       where: { name: category },
//     });
//     if(!name) return res.status(404).json({error:'insert a name'})
//     createdProduct.addCategory(categoryDb);
//     res.status(200).send(createdProduct);
//     console.log(createdProduct, "createdProduct")
//   } catch (error) {
//     console.log(error)
//     res.status(404).send({ message: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let allProducts = (await getAllProducts()).data;
    if (id) {
      let productId = await allProducts.filter((e) => e.id == id);
      var dato = productId[0];
      var datos = {
        brand: dato.brand,
        categories: dato.categories.map((p) => p.name).join(","),
        createdInDb: dato.createdInDb,
        detail: dato.detail,
        feature: dato.feature,
        id: dato.id,
        image: dato.image[0],
        model: dato.model,
        name: dato.name,
        price: dato.price,
        state: dato.state,
        stock: dato.stock,
      };
      productId.length
        ? res.status(200).send(datos)
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
