import express from "express";
import ProductManager from "./index.js";

const app = express();
const productos = new ProductManager();
let products = productos.getProducts();

app.get("/products", async (req, res) => {
    let product = await products;
    const { limit } = req.query;
    if(limit){
        res.send(await product.slice(0, limit))
    }
    res.send(await product);
})

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const prod = await productos.getProductById(pid);
    res.send(prod);
})

app.listen(8080, () => {
    console.log("Servidor con express")
})