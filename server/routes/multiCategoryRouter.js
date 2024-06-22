const express = require('express');
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoriesByParent,
  getParentCategoriesWithChildren,
  updateCategory,
  deleteCategory,
} = require('../controllers/multiCategoryController');

router.post('/categories', createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:parentId', getCategoriesByParent);
router.get('/parentCategories', getParentCategoriesWithChildren);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


module.exports = router;