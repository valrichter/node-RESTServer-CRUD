const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el toke");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarJWT,
};
