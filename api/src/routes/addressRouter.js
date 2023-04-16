const { Router } = require("express");
const{createAddress, addressDB, updateAddress,getaAddressById} =require("../controllers/addressController")

const router = Router();


router.post("/", async (req, res) => {
  try {
    let response = await createAddress(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/", async(req,res)=>{
  try{
    let datosAddress=await addressDB()
    res.json(datosAddress)
  }catch (error){
    res.status(400).send(error.message)
  }
});

router.put("/", async (req, res) => {
  try {
    let response = await updateAddress(req.body);
    response.status !== "error"
      ? res.send(response)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await getaAddressById(id);
    response.status !== "error"
      ? res.send(response.data)
      : res.status(404).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
