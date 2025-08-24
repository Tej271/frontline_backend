const Company = require("../models/company");

const searchCompanies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query param 'q' is required" });
    }

    const regex = new RegExp(q, "i"); // case-insensitive search

    // If q is a valid number, include foundedYear in search
    const orConditions = [
      { name: regex },
      { industry: regex },
      { size: regex },
      { website: regex },
      { "location.city": regex },
      { "location.country": regex },
      { "employees.name": regex },
      { "employees.role": regex },
      { "employees.email": regex },
      { $expr: { $regexMatch: { input: { $toString: "$foundedYear" }, regex: regex } } },
    ];

    const companies = await Company.find({
      $or: orConditions,
    });

    res.json(companies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const query = { ...req.query };

    if (query.isActive !== undefined) {
      query.isActive = query.isActive === "true"; // string -> boolean
    }
    if (query.foundedYear !== undefined) {
      query.foundedYear = Number(query.foundedYear);
    }

    if (query.city || query.country) {
      query["location"] = {};
      if (query.city) query["location.city"] = query.city;
      if (query.country) query["location.country"] = query.country;
      delete query.city;
      delete query.country;
    }

    if (query.employeeName) {
      query["employees.name"] = { $regex: query.employeeName, $options: "i" };
      delete query.employeeName;
    }
    if (query.employeeRole) {
      query["employees.role"] = { $regex: query.employeeRole, $options: "i" };
      delete query.employeeRole;
    }

    if (query.name) {
      query.name = { $regex: query.name, $options: "i" };
    }

    const companies = await Company.find(query);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCompanies,
  createCompany,
  searchCompanies,
};
