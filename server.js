const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");
const cors = require("cors");

app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to database");
  }
);

app.use("/api/user", require("./routes/api/user"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
