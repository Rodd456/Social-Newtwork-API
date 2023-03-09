const router = require("express").Router();

// GET /products
router.get("/", (req, res) => {
  res.send("List of all products");
});

// GET /products/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Details for product ${id}`);
});

// POST /products
router.post("/", (req, res) => {
  const { name, price } = req.body;
  // create new product in database
  res.send(`Product ${name} created with price ${price}`);
});

// PUT /products/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  // update product with id in database
  res.send(`Product ${id} updated with name ${name} and price ${price}`);
});

// DELETE /products/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // delete product with id from database
  res.send(`Product ${id} deleted`);
});

module.exports = router;
