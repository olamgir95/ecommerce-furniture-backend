import dotenv from "dotenv";
dotenv.config();

import http from "http";
import mongoose, { ConnectOptions } from "mongoose";

const connectionString = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  (err: Error) => {
    if (err) {
      console.log("Error on connecting to mongoose");
    } else {
      console.log("Mongoose connection successful");
      // console.log(goose);

      const app = require("./app");
      const server = http.createServer(app);
      const port = process.env.PORT || 3000;
      server.listen(port, () => {
        console.log(
          `Server is running on port ${port}, http://localhost:${port}`
        );
      });
    }
  }
);
