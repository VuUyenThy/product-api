
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./src/routes/productRoutes");

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Product API is healthy"
    });
});

// Product routes
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Product API running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error);

        process.exit(1);
    });
