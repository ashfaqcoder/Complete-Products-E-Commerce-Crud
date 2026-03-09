import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }),
);
app.use(express.json());

let products = [
  {
    id: 1,
    name: "iPhone 17 por max",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMGSH3sMaCziP1cXeBDFOeboJ-j17BVeqLw&s",
    price: 41000000,
    desc: "This is the latest iPhone model with advanced features and a sleek design.",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    imageUrl:
      "https://images.samsung.com/pk/smartphones/galaxy-s23/buy/kv_group_MO_v2.jpg",
    price: 10000000,
    desc: "This is the latest Samsung Galaxy model with advanced features and a sleek design.",
  },
];

/* READ ALL PRODUCTS */
app.get("/products", (req, res) => {
  res.json(products);
});

/* CREATE PRODUCT */
app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});


/* UPDATE PRODUCT */
app.put("/products/:id", (req, res) => {
 const {id} = req.params;
  const updateProduct = req.body;
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updateProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }

});

// delete api
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
