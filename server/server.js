const express = require("express");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();

const routes = require('./routes')
//if you want in every domain then
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

for(let key in routes){
	app.use(routes[key]);
}

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


app.listen(PORT, () => {
	console.log(`  -API> API server running on port ${PORT}!`);
});
