const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");

dotenv.config();
const connectionString = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Error on connecting to mongoose");
    } else {
      console.log("Mongoose connection successful");
      // console.log(goose);

      const app = require("./app");
      const server = http.createServer(app);
      const port = process.env.PORT || 3002;
      server.listen(port, () => {
        console.log(
          `Server is running on port ${port}, http://localhost:${port}`
        );
      });
    }
  }
);
