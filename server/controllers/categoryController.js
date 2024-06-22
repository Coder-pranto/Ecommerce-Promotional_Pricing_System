const Category = require('../models/categorySchema');
const Subcategory = require('../models/subCategorySchema');
const Subsubcategory = require('../models/subsubCategorySchema');
const Subsubsubcategory = require('../models/subsubsubCategorySchema');
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const fs = require('fs');
const path = require('path');


// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!req.files || !req.files.image) {
      throw new CustomError.BadRequestError('Please upload a category image');
  }

  const categoryImage = req.files.image;

  if (!categoryImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload an image file');
  }

  const maxSize = 1024 * 1024; // 1MB
  if (categoryImage.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
  }

  const imagePath = path.join(__dirname, '../public/category', categoryImage.name);
  await categoryImage.mv(imagePath);

  const category = await Category.create({ name, description, image: `/category/${categoryImage.name}` });

  res.status(StatusCodes.CREATED).json({ status: 'Category created successfully', data: category });
};

// Get all categories 
const getAllCategories = async (req, res) => {
    const categories = await Category.find().populate('subcategory');
    res.status(StatusCodes.OK).json({status: 'All data is fetched',data: categories});
};


// Update category
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;

  let category = await Category.findById(categoryId);

  if (!category) {
    throw new CustomError.BadRequestError('CategoryId does not exist!');
  }

  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;
  category.status = req.body.status !== undefined ? req.body.status : category.status;
    
  // Check if a new image is provided
  if (req.files && req.files.image) {
  
    // Delete the old image
    const imagePath = path.join(__dirname, '../public', category.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting category image:', err);
      } else {
        console.log('Category image deleted successfully');
      }
    });

    const newImage = req.files.image;

    if (!newImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload an image file');
    }

    const maxSize = 1024 * 1024;

    if (newImage.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
    }

    // Save the new image
    const newImagePath = path.join(__dirname,'../public/category',newImage.name);

    await newImage.mv(newImagePath);

    category.image = `/category/${newImage.name}`;
  }

  category = await category.save();

  res.status(StatusCodes.OK).json({ msg: 'Selected Category updated successfully', category });
};


// Delete category
const deleteCategory = async (req,res)=>{
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category ) {
      throw new CustomError.BadRequestError("CategoryId does not exist!");
    }

     // Delete the associated image
     const imagePath = path.join(__dirname, '../public', category.image);
     fs.unlink(imagePath, (err) => {
       if (err) {
         console.error('Error deleting category image:', err);
       } else {
         console.log('Category image deleted successfully');
       }
     });

    res.status(StatusCodes.OK).json({ msg: "Selected Category Deleted successfully", category }); 
}





// Create a new subcategory
const createSubcategory = async (req, res) => {
    const { name, description, category, subsubcategory, discountPost } = req.body;
    // const subcategory = await Subcategory.create({ name, description, category, discountPost }); // do in future

    const subcategory = await Subcategory.create({ name, description, category, subsubcategory});

    await Category.findByIdAndUpdate(category, { $push: { subcategory: subcategory._id } });

    res.status(StatusCodes.CREATED).json({status: 'Subcategory is created successfully',data: subcategory});
};

// Update subcategory 

const updateSubcategory = async(req,res)=>{
    const subcategoryId = req.params.id;
    
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategoryId) {
      throw new CustomError.BadRequestError('SubcategoryId does not exist!');
    }

    subcategory.name = req.body.name || subcategory.name;
    subcategory.description = req.body.description || subcategory.description;
    subcategory.status = req.body.status !== undefined ? req.body.status : subcategory.status;
      
    await subcategory.save();
    const updatedSubcategory = await Subcategory.findById(subcategoryId);

    res.status(StatusCodes.OK).json({ msg: "Selected subcategory updated successfully", updatedSubcategory }); 
}

// Delete subcategory
const deleteSubcategory = async (req,res)=>{
    const subcategoryId = req.params.id;
    const subcategory = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!subcategory) {
      throw new CustomError.BadRequestError("SubcategoryId does not exist!");
    }
    res.status(StatusCodes.OK).json({ msg: "Selected subcategory Deleted successfully", subcategory }); 
}

// Get all subcategories
const getAllSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find().populate('category subsubcategory');
    res.status(StatusCodes.OK).json({status: 'All data is fetched',data: subcategories});
};


// Create a new sub-sub-category
const createSubsubcategory = async (req, res) => {
  const { name, description, category, subcategory, discountPost } = req.body;

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    throw new CustomError.NotFoundError('Category not found');
  }

  const newSubsubcategory = await Subsubcategory.create({ name, description, category, subcategory });

  await Subcategory.findByIdAndUpdate(subcategory, { $push: { subsubcategory: newSubsubcategory._id } });

  res.status(StatusCodes.CREATED).json({ status: 'Subsubcategory created successfully', data: newSubsubcategory });
};

// Create a new sub-sub-sub-category
const createSubsubsubcategory = async (req, res) => {

  const { name, description, category, subcategory, subsubcategory, discountPost } = req.body;

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    throw new CustomError.NotFoundError('Category not found');
  }

  const existingSubcategory = await Subcategory.findOne({ _id: subcategory, category: category });
  if (!existingSubcategory) {
    throw new CustomError.NotFoundError('Subcategory not found for the given category');
  }

  const existingSubsubcategory = await Subsubcategory.findOne({ _id: subsubcategory, subcategory: subcategory });
  if (!existingSubsubcategory) {
    throw new CustomError.NotFoundError('Subsubcategory not found for the given subcategory');
  }

  const newSubsubsubcategory = await Subsubsubcategory.create({ name, description, category, subcategory, subsubcategory});

  await Subsubcategory.findByIdAndUpdate(subsubcategory, { $push: { subsubsubCategory: newSubsubsubcategory._id } });

  res.status(StatusCodes.CREATED).json({ status: 'Subsubsubcategory created successfully', data: newSubsubsubcategory });

};

const getAllSubsubcategories = async (req, res) => {
  const subsubcategories = await Subsubcategory.find().populate('category').populate('subcategory').populate('subsubsubCategory');
  res.status(StatusCodes.OK).json({ status: 'All subsubcategories fetched successfully', data: subsubcategories });
};

const getAllSubsubsubcategories = async (req, res) => {
  const subsubsubcategories = await Subsubsubcategory.find().populate('category').populate('subcategory').populate('subsubcategory');
  res.status(StatusCodes.OK).json({ status: 'All subsubsubcategories fetched successfully', data: subsubsubcategories });
};

// Update subsubcategory
const updateSubsubcategory = async (req, res) => {
  const subsubcategoryID = req.params.id;
  const { name, description, category, subcategory, status } = req.body;

  const updatedSubsubcategory = await Subsubcategory.findByIdAndUpdate(
    subsubcategoryID,
    { name, description, category, subcategory, status },
    { new: true }
  );

  if (!updatedSubsubcategory) {
    throw new CustomError.BadRequestError('SubsubcategoryId does not exist!');
  }
  res.status(StatusCodes.OK).json({ success: true, data: updatedSubsubcategory });

};

// Update subsubsubcategory
const updateSubsubsubcategory = async (req, res) => {
  const subsubsubcategoryID = req.params.id;
  const { name, description, category, subcategory, subsubcategory, status } = req.body;

  const updatedSubsubsubcategory = await Subsubsubcategory.findByIdAndUpdate(
    subsubsubcategoryID,
    { name, description, category, subcategory, subsubcategory, status },
    { new: true }
  );

  if (!updatedSubsubsubcategory) {
    throw new CustomError.BadRequestError('SubsubsubcategoryId does not exist!');
  }
  res.status(StatusCodes.OK).json({ success: true, data: updatedSubsubsubcategory });
};

// Delete subsubcategory
const deleteSubsubcategory = async (req, res) => {
  const subsubcategoryID = req.params.id;

  const deletedSubsubcategory = await Subsubcategory.findByIdAndDelete(
    subsubcategoryID
  );

  if (!deletedSubsubcategory) {
    throw new CustomError.BadRequestError('SubsubcategoryId does not exist!');
  }

  res.status(StatusCodes.OK).json({ success: true, data: deletedSubsubcategory });

};

// Delete subsubsubcategory
const deleteSubsubsubcategory = async (req, res) => {
  const subsubsubcategoryID = req.params.id;

  const deletedSubsubsubcategory = await Subsubsubcategory.findByIdAndDelete(
    subsubsubcategoryID
  );

  if (!deletedSubsubsubcategory) {
    throw new CustomError.BadRequestError('SubsubsubcategoryId does not exist!');
  }
  res.status(StatusCodes.OK).json({ success: true, data: deletedSubsubsubcategory });
};

module.exports =  {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getAllSubcategories,
    createSubsubcategory,
    createSubsubsubcategory,
    getAllSubsubcategories,
    getAllSubsubsubcategories,
    updateSubsubcategory, 
    updateSubsubsubcategory,
    deleteSubsubcategory,
    deleteSubsubsubcategory
  };
