const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "address",
    {
      idAddress: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.STRING,
      },
      cruzamiento: {
        type: DataTypes.STRING,
      },
      colonia: {
        type: DataTypes.STRING,
      },
      municipio: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      pais: {
        type: DataTypes.STRING,
      },
      codigoPostal: {
        type: DataTypes.STRING,
      },
      referencia: {
        type: DataTypes.STRING,
      },
     
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
