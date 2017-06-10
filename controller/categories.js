const Category = require('../model/category');

module.exports = async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });

  res.success(categories);
};
