const Category = require("../models/category");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createCategory = async (req, res) => {
  const { name, description, isActive } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  try {
    const category = new Category({ name, description, isActive });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCategory) return res.status(404).json({ message: "Product not found" });

    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
