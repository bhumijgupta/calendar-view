const fs = require("fs"),
  jwt = require("jsonwebtoken"),
  dotenv = require("dotenv"),
  path = require("path"),
  crypto = require("crypto");

// ***************
// CONFIG
// ***************

dotenv.config();
const PUBLICKEY = fs.readFileSync(
  path.resolve(__dirname, "../auth-keys/public-key.pem"),
  "utf-8"
);
const PRIVATEKEY = fs.readFileSync(
  path.resolve(__dirname, "../auth-keys/private-key.pem"),
  "utf-8"
);
const ENCRYPT_KEY = crypto.scryptSync(process.env.ENCRYPT_SECRET, "salt", 24);
const iv = Buffer.alloc(16, 0);

// ***************
// METHODS
// ***************

let signToken = (payload) => {
  // Encrypt payload
  const cipher = crypto.createCipheriv("aes-192-cbc", ENCRYPT_KEY, iv);
  let encryptedPayload =
    cipher.update(JSON.stringify(payload), "utf8", "hex") + cipher.final("hex");
  // create jwt
  let signOptions = {
    algorithm: "RS256",
  };
  return jwt.sign(encryptedPayload, PRIVATEKEY, signOptions);
};

let verifyToken = (token) => {
  try {
    //   verify token
    let verifyOptions = {
      algorithm: ["RS256"],
    };
    return jwt.verify(token, PUBLICKEY, verifyOptions);
  } catch (err) {
    return false;
  }
};

let decodeToken = (token) => {
  // Get payload
  const payload = jwt.decode(token);
  //   decrypt payload
  const decipher = crypto.createDecipheriv("aes-192-cbc", ENCRYPT_KEY, iv);
  var decryptedToken =
    decipher.update(payload, "hex", "utf8") + decipher.final("utf8");
  return decryptedToken;
};

module.exports = { signToken, verifyToken, decodeToken };
