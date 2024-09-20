import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows to accept json data

app.post("/api/products", async (req, res) => {
    const product = req.body; // user send post data
    if (!product.name) {
        return res.status(400).json({ success: false, message: "Product name is required" });
    } else if (!product.price) {
        return res.status(400).json({ success: false, message: "Product price is required" });
    } else if (!product.image) {
        return res.status(400).json({ success: false, message: "Product image is required" })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error is ", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
});

app.listen(5001, () => {
    connectDB();
    console.log("Server started at http://localhost:5001")
});