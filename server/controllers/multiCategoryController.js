const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Category = require('../models/multilevelCategorySchema');

// Create category
const createCategory = async (req, res) => {
    const { name, slug, parent } = req.body;
    const category = new Category({ name, slug, parent });
    const newCategory = await category.save();
    res.status(StatusCodes.CREATED).json(newCategory);
};

// Get all categories
const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json(categories);
};

// Get categories by parent
const getCategoriesByParent = async (req, res) => {
    const parentId = req.params.parentId;
    const categories = await Category.find({ parent: parentId });
    res.status(StatusCodes.OK).json(categories);
};

// Get parent categories with children
const getParentCategoriesWithChildren = async (req, res) => {
    const parentCategories = await Category.find({ parent: null }).populate('parent');
    res.json(parentCategories);
};
// const getParentCategoriesWithChildren = async (req, res) => {
//     const parentCategories = await Category.find({ parent: null }).populate({
//         path: 'children',
//         model: 'Category'
//     });
//     res.json(parentCategories);
// };



// Update category
const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, slug, parent } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name, slug, parent },
        { new: true }
    );

    if(!updatedCategory){
        throw new CustomError.BadRequestError('category not found!!!');
    }

    res.status(StatusCodes.OK).json(updatedCategory);
};

// Delete category
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    const data = await Category.findByIdAndDelete(categoryId);

    if(!data){
        throw new CustomError.BadRequestError('category not found!!!');
    }

    res.status(StatusCodes.OK).json("Category has been deleted");
   
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoriesByParent,
  getParentCategoriesWithChildren,
  updateCategory,
  deleteCategory,
};
