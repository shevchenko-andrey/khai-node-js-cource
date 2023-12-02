const express = require("express");
const products = require("./products");
const { blockSpecialBrand } = require("./middleware");

const router = express.Router();

// handle get request for path /products
router.get("/products", (request, response) => {
  return response.json(products);
});

router.get("/product/:id", blockSpecialBrand, (request, response) => {
  const { id } = request.params; // Access the id parameter from the URL

  // Find product based on the id parameter
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  response.json(product); // Send the product as a JSON response
});

// handle get request for path /products/:brand
router.get("/products/:brand", blockSpecialBrand, (request, response) => {
  const { brand } = request.params; // Access the brand parameter from the URL

  // Filter products based on the brand parameter
  const filteredProducts = products.filter(
    (product) => product.brand === brand
  );

  response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get("/productswitherror", (request, response) => {
  let err = new Error("processing error ");
  err.statusCode = 400;
  throw err;
});

module.exports = router;
