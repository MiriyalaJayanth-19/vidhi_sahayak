const express = require("express");
const { getLawyers, getLawyerById } = require("../controllers/lawyerController");

const router = express.Router();

router.get("/", getLawyers);
router.get("/:id", getLawyerById);

module.exports = router;
