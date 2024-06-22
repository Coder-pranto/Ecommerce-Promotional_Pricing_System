const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyJWTToken = require("../middlewares/verifyJwtToken");

//category
router.post('/', verifyJWTToken('admin'), categoryController.createCategory);
router.patch('/:id', verifyJWTToken('admin'), categoryController.updateCategory);
router.delete('/:id', verifyJWTToken('admin'), categoryController.deleteCategory);
router.get('/all', categoryController.getAllCategories);

//subcategory
router.post('/sub', verifyJWTToken('admin'), categoryController.createSubcategory);
router.patch('/sub/:id', verifyJWTToken('admin'), categoryController.updateSubcategory);
router.delete('/sub/:id', verifyJWTToken('admin'), categoryController.deleteSubcategory);
router.get('/sub/all', categoryController.getAllSubcategories);

//subsubcategory
router.post('/subsub', verifyJWTToken('admin'), categoryController.createSubsubcategory);
router.patch('/subsub/:id', verifyJWTToken('admin'), categoryController.updateSubsubcategory);
router.delete('/subsub/:id', verifyJWTToken('admin'), categoryController.deleteSubsubcategory);
router.get('/subsub/all', categoryController.getAllSubsubcategories);

//subsubsubcategory
router.post('/subsubsub', verifyJWTToken('admin'), categoryController.createSubsubsubcategory);
router.patch('/subsubsub/:id', verifyJWTToken('admin'), categoryController.updateSubsubsubcategory);
router.delete('/subsubsub/:id', verifyJWTToken('admin'), categoryController.deleteSubsubsubcategory);
router.get('/subsubsub/all', categoryController.getAllSubsubsubcategories);


module.exports = router;
