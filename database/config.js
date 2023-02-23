const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log(err);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
