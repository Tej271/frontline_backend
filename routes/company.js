const express = require("express");

const { getCompanies, createCompany, searchCompanies } = require("../controllers/company");

const router = express.Router();

router.route("/").get(getCompanies).post(createCompany);

router.route("/search").get(searchCompanies);

module.exports = router;
