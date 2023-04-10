const axios = require("axios");
const { Address } = require("../db");
require("dotenv").config();

const addressDB=async()=>{
  let addDB=await Address.findAll()
  let datAds=addDB.map((e)=>{
    return{
     idAddress: e.idAddress,
     tipo:e.tipo,
     calle:e.calle,
     numero:e.numero,
     cruzamiento:e.cruzamiento,
     colonia:e.colonia,
     municipio:e.municipio,
     estado:e.estado,
     pais:e.pais,
     codigoPostal:e.codigoPostal,
     referencia:e.referencia,
     userId:e.userId
    }
  })
  return datAds
}


const createAddress = async (address) => {
  const {tipo,calle,numero,cruzamiento,colonia,municipio,estado,pais,codigoPostal,referencia,id } = address;
  try {
    let aCreated = await Address.create({
      tipo,
      calle,
      numero,
      cruzamiento,
      colonia,
      municipio,
      estado,
      pais,
      codigoPostal,
      referencia,
      userId:id

    });
    return {
      aCreated,
      message: "Address created succesfully",
      status: "success",

    }
;
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};







module.exports = {
  addressDB,
  createAddress
};


