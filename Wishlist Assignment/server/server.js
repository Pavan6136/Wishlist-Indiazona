const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const db = require("./models");
const { Wishlist } = require("./models");
app.use(express.json());



const wishlistRoutes = require("./routes/app/wishlistRoutes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/v1/wishlist", wishlistRoutes);

app.get("/select", (req, res) => {
  Wishlist.findAll()
    .then((wishlists) => {
      res.send(wishlists);
    })
    .catch((err) => {
      console.error("Error fetching wishlists:", err);
      res.status(500).json({ message: "Error fetching wishlists" });
    });
});

app.get("/test-db", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection failed!");
  }
});

app.get("/insert", (req, res) => {
  Wishlist.create({
    name: "Pavan",
    user_id: 1,
  })
    .then(() => {
      res.send("Inserted");
    })
    .catch((err) => {
      console.error("Error inserting into the database:", err);
      res.status(500).send("Error inserting into the database");
    });
});

app.get("/delete", (req, res) => {
  res.send("deleted");
});


db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
