const Category = require("../models/category");

const createCategory = async (
  categoryData
) => {
  return await Category.create(categoryData);
};

const getAllCategories = async () => {
  return await Category.find({})
    .sort({ name: 1 });
};

module.exports = {
  createCategory,
  getAllCategories
};