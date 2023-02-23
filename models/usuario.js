const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "The NAME is obligatory"],
  },
  email: {
    type: String,
    required: [true, "The EMAIL is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The PASSWORD is obligatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "The ROLE is obligatory"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();

  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
