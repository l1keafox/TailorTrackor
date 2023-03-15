const express = require("express");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();

const routes = require('./routes')
for(let key in routes){
	app.use(routes[key]);
}
//if you want in every domain then
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


app.listen(PORT, () => {
	console.log(`  -API> API server running on port ${PORT}!`);
});
