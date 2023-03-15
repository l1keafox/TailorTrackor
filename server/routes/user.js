const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();

router.get("/users", async (req, res) => {

});

router.post("/users/createAcct", async (req, res) => {
});

router.post("/users/login", async (req, res) => {
	//Login a registered user

});

router.post("/users/me/logout",  async (req, res) => {
	// Log user out of the application

});

router.post("/users/me/logoutall",  async (req, res) => {
	// Log user out of all devices

});
module.exports = router;