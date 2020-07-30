const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    let url = path.join(__dirname, "client/build", "index.html");
    if (!url.startsWith("/app/"))
      // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });
}

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
