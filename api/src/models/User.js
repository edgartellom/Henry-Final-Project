const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      photoURL: {
        type: DataTypes.STRING,
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
