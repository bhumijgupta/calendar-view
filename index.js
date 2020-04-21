const dotenv = require("dotenv"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  helmet = require("helmet"),
  morgan = require("morgan"),
  noCache = require("nocache"),
  apiRoutes = require("./routes/api"),
  authRoutes = require("./routes/auth"),
  PORT = process.env.PORT || 3000,
  app = express();

// ***************
// CONFIGURATION
// ***************

dotenv.config();
//Configuring the express instance
// Prevent misconfig headers
app.disable("x-powered-by");

// Prevent opening page in frame or iframe to protect from clickjacking
app.use(helmet.frameguard());

// Prevents browser from caching and storing page
app.use(noCache());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable all CORS requests
app.use(cors());

//If executing in test environment then prevent logging
if (process.env.NODE_ENV !== "test") {
  // log HTTP requests
  app.use(morgan("tiny"));
}

// ***************
// ROUTES
// ***************

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
