const express = require("express");
const app = express();
const router_admin = require("./router_admin.js");
const cookieParser = require("cookie-parser");
let session = require("express-session");
const router = require("./router.js");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const http = require("http");

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1. Initialization code
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// 2. Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 300, // 30 minutes
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.member = req.session.member;
  next();
});

// 3. View engine setup
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing setup
app.use("/", router);
app.use("/maltimart", router_admin);

const server = http.createServer(app);

module.exports = server;
