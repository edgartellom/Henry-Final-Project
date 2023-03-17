const axios = require("axios");
const { User } = require("../db");
require("dotenv").config();
const API_FIRESTORE_URL = process.env.API_FIRESTORE_URL;

const getApiInfo = async () => {
  try {
    const dataFireStore = (await axios(API_FIRESTORE_URL)).data;
    const users = dataFireStore.documents.map((user) => user.fields);
    const apiInfo = await users.map((el) => ({
      id: el.id?.stringValue,
      username: el.username?.stringValue,
      email: el.email?.stringValue,
      admin: el.admin?.booleanValue,
    }));
    return apiInfo;
  } catch (error) {
    console.log({ message: error.message });
  }
};

const getAllUsers = async () => {
  try {
    const apiInfo = await getApiInfo();
    let createdCount = 0;
    let foundCount = 0;
    let userPromises = await Promise.all(
      apiInfo.map(async (userData) => {
        const [user, created] = await User.findOrCreate({
          where: { id: userData.id, email: userData.email },
          defaults: { username: userData.username, admin: userData.admin },
        });
        if (created) {
          createdCount++;
        } else {
          foundCount++;
        }
        return user;
      })
    );
    console.log(
      `${createdCount} users created, ${foundCount} users found in the database.`
    );
    const users = await User.findAll();
    return { data: users, status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (user) {
      return { data: user, status: "success" };
    }
    return { message: "User Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const createUser = async (user) => {
  const { id, username, email, admin } = user;
  try {
    let userFound = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userFound) return { message: "User already exists", status: "error" };

    let userCreated = await User.create({
      id: id,
      username: username,
      email: email,
      admin: admin,
    });
    return {
      userCreated,
      message: "User created succesfully",
      status: "success",
    };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateUser = async (user) => {
  const { id, username, admin, state } = user;
  try {
    const userFromDb = await User.findByPk(id);
    if (userFromDb) {
      await userFromDb.update({
        username,
        admin,
        state,
      });
      return { message: "User updated succesfully", status: "success" };
    }
    return { message: "User Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
};
