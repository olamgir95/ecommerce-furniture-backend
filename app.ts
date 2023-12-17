import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import router_admin from "./router_admin";

const MongoDBStore = connectMongoDBSession(session);

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1. Initialization code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2. Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  //   res.locals.member = req.session.member;
  next();
});

// 3. View engine setup
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing setup
// app.use("/", router);
app.use("/resto", router_admin);

export default app;
