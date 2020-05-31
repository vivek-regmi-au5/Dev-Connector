const express = require("express");
const app = express();
const mongoose = require("mongoose");

// mongodb+srv://vivek:<password>@cluster0-perqq.mongodb.net/test?retryWrites=true&w=majority
// // Ya435SVLHloHq5Yz

mongoose.connect(
	"mongodb+srv://vivek://Ya435SVLHloHq5Yz@cluster0-perqq.mongodb.net/test?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	() => {
		console.log("Connected to database");
	}
);

app.get("/", (req, res) => {
	res.send("Test route");
});

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
