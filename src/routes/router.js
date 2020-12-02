const express = require("express");

const router = express.Router();

// Authentication's functions
const { authenticated } = require("../middleware/authentication");
const { uploadFile, uploadImage } = require("../middleware/upload");

// Users' functions
const { getUsersData, deleteUser, changePhoto } = require("../controller/user");

// login & register function
const { register, login, checkAuth } = require("../controller/auth");

// Categories' functions
const {
  getCategories,
  getOneCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controller/category");

// Books' functions
const {
  getBooks,
  getFilteredBook,
  getOneBook,
  createBook,
  editBook,
  deleteBook,
} = require("../controller/book");

// Collections' functions
const { getMyCollections, addCollection } = require("../controller/collection");
const { getMyBooks } = require("../controller/author");

// routing for register & login
router.post("/register", register);
router.post("/login", login);
router.get("/auth", authenticated, checkAuth);

// routing for Users
router.get("/users", getUsersData);
router.delete("/user/:id", deleteUser);
router.patch("/change-photo", uploadImage(), authenticated, changePhoto);

// routing for Categories
router.get("/category", getCategories);
router.get("/category/:id", getOneCategory);
router.post("/category", authenticated, createCategory);
router.patch("/category/:id", authenticated, editCategory);
router.delete("/category/:id", authenticated, deleteCategory);

// routing for Books
router.get("/books", getBooks);
router.get("/books/:id", getFilteredBook);
router.get("/mybooks", authenticated, getMyBooks);
router.get("/book/:id", getOneBook);
router.post("/book", uploadFile(), authenticated, createBook);
router.patch("/book/:id", authenticated, editBook);
router.delete("/book/:id", authenticated, deleteBook);

// routing for Collections
router.get("/collections", authenticated, getMyCollections);
router.post("/add-collection/:id_book", authenticated, addCollection);

module.exports = router;
